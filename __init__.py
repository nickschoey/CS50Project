from flask import Flask, render_template, request, url_for, redirect, flash, session, jsonify
from datetime import datetime
from wtforms import Form, validators, BooleanField, StringField, PasswordField 
from dbconnect import connection, connectionDict
from passlib.hash import sha256_crypt
from MySQLdb import escape_string as thwart
from functools import wraps
from flask_mail import Mail, Message

import gc
import time
import pytz


peopleCount=0


app = Flask(__name__)
app.config.update(
	DEBUG=True,
	#EMAIL SETTINGS
	MAIL_SERVER='smtp.gmail.com',
	MAIL_PORT=465,
	MAIL_USE_SSL=True,
	MAIL_USERNAME = 'jorditestmail@gmail.com',
	MAIL_PASSWORD = 'databank'
	)
mail = Mail(app)

def send_mail(id):
	try:
		resaid = id
		cDict, connDict = connectionDict()
		cDict.execute("""SELECT * FROM resauni
				 		WHERE resa_id=%s""",
				 		(resaid,))
		resauni = cDict.fetchall()

		c, conn = connectionDict()
		c.execute("""SELECT * FROM resa
				 		WHERE resa_id=%s""",
				 		(resaid,))
		resa = c.fetchone()
		userid = str(resa['user_id'])

		e, eonn = connectionDict()
		e.execute("""SELECT email, fullname, username, telephone FROM user
				 		WHERE user_id=%s""",
				 		(userid,))
		user = e.fetchone()
		#return(render_template("confirmation.html", resa=resa, resauni=resauni, user=user))

		msg = Message('Reservation #%s Confirmation' %resaid,
			sender="jorditestmail@gmail.com",
			recipients=[user['email']])
		msg.html = render_template("confirmation.html", resa=resa, resauni=resauni, user=user)
		mail.send(msg)

	except Exception as e:
		return  ('whoops '+str(e))

@app.route('/send', methods=['GET', 'POST'])
def send():
	if request.method == 'POST':
		dates = request.form['datefilter']
		startDate = request.form['startDate']
		endDate = request.form['endDate']
		days = request.form['days']
		user_id = session['user_id']
		now = datetime.now(pytz.timezone('Europe/Amsterdam'))
		c, conn = connection()
   		
		

		c.execute("""INSERT INTO resa 
					 (user_id, creationdate, dates, datestart, dateend, days, people, status, total) 
					 VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)""",
					 (session['user_id'], now.strftime("%y-%m-%d %H:%M:%S"), dates, startDate, endDate, days, 1, 0, 0))

		conn.commit()
		c.close()
		conn.close()
		gc.collect()
		
		return redirect(url_for("gear"))
	
@app.route('/', methods=['GET', 'POST'])
def login_page():
	error = ''
	try:
		if request.method == 'GET':
			if session['logged_in']:
				return redirect(url_for("dashboard"))
			else:
				return redirect(url_for("login_page"))

		if request.method == 'POST':
			c, conn = connection()
			data = c.execute("SELECT * FROM user WHERE username = (%s)", 
							[thwart(request.form["username"])])
			data = c.fetchone()
			if data == None:
				error = "Invalid credentials, try again."
				return render_template("login.html", error=error)
			visitcount = data[9]
			visitcount += 1 

			if sha256_crypt.verify(request.form['password'], data[2]):
				session['logged_in'] = True
				session['username'] = data[1]
				session['user_id'] = data[0]
				c.execute('''UPDATE user 
							 SET visitcount = %s
							 WHERE username = %s''',
							 (int(visitcount), [thwart(request.form["username"])]))
				conn.commit()
				c.close()
				conn.close()
				gc.collect()
				if data[7] == 1:
					session['administrator'] = True
					flash("You are logged in as an administrator")
					return redirect(url_for("dashboardAdmin"))
					
				return redirect(url_for("dashboard"))

			else:
				error = "Invalid credentials, try again."
				return render_template("login.html", error=error)

	except Exception as e:

		return render_template("login.html")

@app.route('/register', methods=['GET', 'POST'])
def register_page():

	try:
		form = RegistrationForm(request.form)

		if request.method == "POST" and form.validate():
			username = form.username.data
			email = form.email.data
			password = sha256_crypt.encrypt((str(form.password.data)))
			fullname = form.fullname.data
			visitcount = 0
			now = datetime.now(pytz.timezone('Europe/Amsterdam'))
			c, conn = connection()

			x = c.execute("SELECT * FROM user WHERE username = (%s)", [thwart(username)])

			if int(x) > 0:
				flash("That username is already taken, please try another")
				return render_template("register.html", form=form)
			else:
				c.execute("INSERT INTO user (username, password, email, fullname, visitcount, creationdate) VALUES (%s, %s, %s, %s, %s, %s)",
						  ([thwart(username)], [thwart(password)], [thwart(email)], [thwart(fullname)], (visitcount), now.strftime("%y-%m-%d")))
				conn.commit()
				c.close()
				conn.close()
				gc.collect()
				flash("You've been successfully registered. Please log in.")
				return redirect(url_for('login_page'))

		return render_template("register.html", form=form)
	
	except Exception as e:
	 	return("whoops " + str(e))

class RegistrationForm(Form):
	username = StringField('Your Username', [validators.Length(min=6, max=20)], description="Enter your Username")
	fullname = StringField('Your Name', [validators.Length(min=4, max=65)], description="Enter your Name")
	email = StringField('Your Email', [validators.Email("Please enter your email address.")], description="Enter your Email")
	password = PasswordField('Password', [validators.DataRequired(), validators.Length(min=6, max=50)],
										  description="Enter your Password")
	confirm = PasswordField('Confirm Password', [validators.EqualTo('password', message="Passwords must match")], description="Confirm your password")
	accept_tos = BooleanField('I accept the <a href="/tos">terms of service</a>',
							 [validators.DataRequired()])

def login_required(f):
	@wraps(f)
	def wrap(*args, **kwargs):
		if 'logged_in' in session:
			return f(*args, **kwargs)
		else:
			flash("Login Required")
			return redirect(url_for('login_page'))

	return wrap

@app.route('/logout')
@login_required			
def logout():
	session.clear()
	flash("You have been logged out!")
	gc.collect
	return redirect(url_for('login_page'))
	

@app.route('/dashboard', methods=['GET', 'POST'])
@login_required
def dashboard():
	try:
		if request.method == "GET":
			try:
				if session['administrator'] == True:
					return redirect(url_for("dashboardAdmin"))	
			except Exception as e:
				username = session['username']
				cDict, connDict = connectionDict()
				cDict.execute("""SELECT * FROM resa
							 		WHERE user_id=%s AND status <> 0 AND status <> 4  AND status <> 5 ORDER BY resa_id DESC""",
							 		(session['user_id'],))
				data = cDict.fetchmany(5)
				return render_template('dashboard.html', data=data, username=username)
	except Exception as e:
		return('Whoops' + str(e))





@app.route('/front', methods=['GET', 'POST'])
@login_required
def front():
	username = session['username']
	return render_template("front.html", username=username)

@app.route('/gear/', methods=['GET', 'POST'])
@login_required
def gear():
	
	try:
		try:
			if session['administrator'] == True:
				return redirect(url_for("gearAdmin"))
		except:

			c, conn = connection()
			x = c.execute("""SELECT * FROM resa 
						 WHERE user_id=%s
						 ORDER BY resa_id DESC""", 
						 (session['user_id'],))
			x = c.fetchone()
			session['resa_id'] = x[0]
			dates = x[3]
			datestart = x[4]
			dateend = x[5]
			days = x[6]
			people = x[7]
			total = float(x[14])
			c.close()
			conn.close()
			gc.collect()
			
			if request.method == "GET":
				
				return render_template("gear.html", username=session['username'], resa_id=session['resa_id'],
										dates=dates, days=days, people=people, peopleCount=peopleCount, total=total)


			elif request.method == "POST":

				price = float(request.form['total'])
				total += price
				name = request.form['nameUni']
				mbPack = request.form['montBlancPack']
				gaillandKit = request.form['gaillandsPack']
				viaFerrataKit = request.form['viaFerrataPack']
				alpBoots = request.form['alpinismShoes']
				if alpBoots == "1":
					alpBootSize = request.form['alpinismShoeSize']
				else:
					alpBootSize = "0"
				crampons = request.form['crampons']
				iceCrampon = request.form['cramponGlace']
				iceAxe = request.form['piolet']
				helmet = request.form['casque']
				harness = request.form['harness']
				gaiters = request.form['gaiters']
				poles = request.form['poles']
				backpack = request.form['backpack']
				techIceAxes = request.form['pioletGlace']
				climbingShoes = request.form['climbingShoes']
				kidClimbingShoes = request.form['kidClimbingShoes']
				viaFerrataShock = request.form['shockAbsorber']
				crashpad = request.form['crashpad']
				slackline = request.form['slackline']
				hikingShoes = request.form['hikingShoes']
				babyCarrier = request.form['babyCarrier']
				stroller = request.form['babyStroller']

				if request.form['casqueClimb'] == "1":
					helmet = "1"
				if request.form['harnessClimb'] == "1":
					harness = "1"
				if request.form['cramponsHike'] == "1":
					crampons = "1"
				if request.form['polesHike'] == "1":
					poles = "1"
				if request.form['backpackHike'] == "1":
					backpack = "1"


				c, conn = connection()
				c.execute("""UPDATE resa
							SET total = %s
							WHERE resa_id = %s""",
							(total, session['resa_id'],))
				c.execute("""INSERT INTO resauni 
							 (resa_id, user_id, name, datestart, dateend, days, price,
							  mbPack, gaillandKit, viaFerrataKit,
							  alpBoots, alpBootSize, crampons, iceAxe, iceCrampon, helmet, harness, gaiters, poles, techIceAxes, backpack,
							  climbingShoes, kidClimbingShoes, viaFerrataShock, crashpad, slackline,
							  hikingShoes, babyCarrier, stroller)
							 VALUES (%s, %s, %s, %s, %s, %s, %s,	
							 		 %s, %s, %s, 	
							 		 %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,	
							 		 %s, %s, %s, %s, %s,	
							 		 %s, %s, %s)""",	
							 (session['resa_id'], session['user_id'], name, datestart, dateend, days, price,
							  mbPack, gaillandKit, viaFerrataKit,
							  alpBoots, alpBootSize, crampons, iceAxe, iceCrampon, helmet, harness, gaiters, poles, techIceAxes, backpack,
							  climbingShoes, kidClimbingShoes, viaFerrataShock, crashpad, slackline,
							  hikingShoes, babyCarrier, stroller))
				conn.commit()
				c.close()
				conn.close()
				gc.collect()

				return redirect(url_for('post'))
		
	except Exception as e:
	 	return("whoopsee " + str(e))

@app.route('/post/', methods=['GET', 'POST'])
@login_required
def post():
	try:
		if request.method == "GET":
			username = session['username']
			resa_id = session['resa_id']
			cDict, connDict = connectionDict()
			cDict.execute("""SELECT * FROM resauni
						 		WHERE resa_id=%s""",
						 		(session['resa_id'],))
			data = cDict.fetchall()
			c,conn = connection()
			c.execute("""SELECT total FROM resa
						 		WHERE resa_id=%s""",
						 		(session['resa_id'],))
			total = c.fetchone()[0]
			count = 0
			for e in data:
				count += 1
			return render_template('post.html', data=data, resa_id=resa_id, count=count, total=total)

		elif request.method == "POST":
			comment = request.form['comment']
			telephone = request.form['telephone']
			cDict, connDict = connectionDict()
			cDict.execute("""SELECT * FROM resauni
						 		WHERE resa_id=%s""",
						 		(session['resa_id'],))
			data = cDict.fetchall()
			count = 0
			for e in data:
				count += 1
			today = time.strftime("%Y-%m-%d")
			c,conn = connection()
			c.execute("""UPDATE resa
						 SET status = 1, comment = %s, people= %s, active= %s
				 		 WHERE resa_id = %s""",
				 		 (comment, count, today, session['resa_id'],))

			c.execute("""UPDATE user
						 SET telephone = %s
						 WHERE user_id = %s""",
						 (telephone, session['user_id'],))
			conn.commit()
			c.close()
			conn.close()
			gc.collect()
			flash("Success! Your reservation is complete")
			return redirect(url_for('history'))


	except Exception as e:
		return("Whoops" + str(e))

@app.route('/history/', methods=['GET', 'POST'])
@login_required
def history():
	try:
		if request.method == "GET":
			username = session['username']
			cDict, connDict = connectionDict()
			cDict.execute("""SELECT * FROM resa
						 		WHERE user_id=%s AND status <> 0 AND status <> 4""",
						 		(session['user_id'],))
			data = cDict.fetchall()
			return render_template('history.html', data=data)

		elif request.method == "POST":
			resa_id = request.form['resaId']
			username = session['username']
			cDict, connDict = connectionDict()
			cDict.execute("""SELECT * FROM resauni
				 			 WHERE user_id=%s AND resa_id=%s""",
				 			 ((session['user_id'],), resa_id))
			data = cDict.fetchall()
			return render_template('historyUni.html', data=data, resa_id=resa_id)


	except Exception as e:
		return("Whoops" + str(e))

@app.route('/historyUni/', methods=['GET', 'POST'])
@login_required
def historyUni():
	cDict, connDict = connectionDict()
	cDict.execute("""SELECT * FROM resa
				 		WHERE user_id=%s""",
				 		(session['user_id'],))
	data = cDict.fetchall()
	return render_template('history.html', data=data, resa_id=resa_id)

@app.errorhandler(500)
def page_not_found(e):
	return(str(e))


@app.route('/faq/', methods=['GET'])
def faq():
	cDict, connDict = connectionDict()
	cDict.execute("SELECT * FROM user")
	data = cDict.fetchall()
	return jsonify(data)

@app.route('/prices/', methods=['GET'])
def prices():
	return render_template('prices.html')

@app.route('/settings/', methods=['GET'])
def settings():
	return ('toDo')

@app.route('/admin/', methods=['GET', 'POST'])
def admin():
	try:
		if session['administrator'] == True:
			if request.method == "GET":
				username = session['username']
				cDict, connDict = connectionDict()
				cDict.execute("""SELECT resa.resa_id, resa.user_id, user.fullname, resa.creationdate, 
										resa.dates, resa.datestart, resa.dateend, resa.days, resa.people, 
										resa.status, resa.comment, resa.total  
										FROM resa INNER JOIN user ON resa.user_id = user.user_id""")
				data = cDict.fetchall()

				return render_template('admin.html', data=data)

			elif request.method == "POST":
				resa_id = request.form['resaId']
				username = session['username']
				cDict, connDict = connectionDict()
				cDict.execute("""SELECT * FROM resauni
					 			 WHERE user_id=%s AND resa_id=%s""",
					 			 ((session['user_id'],), resa_id))
				data = cDict.fetchall()
				return render_template('historyUni.html', data=data, resa_id=resa_id)
	except Exception as e:
		flash("You don't have administrator privileges")
		return redirect(url_for('dashboard'))

@app.route('/delete/<page_id>')
def delete(page_id):
	pageid = page_id
	c, conn = connection()
	c.execute("""UPDATE resa
				 SET status = 4
				 WHERE user_id=%s AND resa_id=%s""",
				 ((session['user_id'],), pageid))
	conn.commit()
	c.close()
	conn.close()
	gc.collect()
	return redirect(url_for('history'))

@app.route('/info/<page_id>')
def info(page_id):
	try:
		pageid = page_id
		cDict, connDict = connectionDict()
		cDict.execute("""SELECT * FROM resauni 
				WHERE user_id=%s AND resa_id=%s""",
				((session['user_id'],), pageid))
		data = cDict.fetchall()	
		return jsonify(data)
	except Exception as e:
		return("Whoops" + str(e))


@app.route('/infoAdmin/<page_id>')
def infoAdmin(page_id):
	try:
		pageid = page_id
		cDict, connDict = connectionDict()
		cDict.execute("""SELECT *
						 FROM resauni WHERE resauni.resa_id=%s""", (pageid,))
		data = cDict.fetchall()
		return jsonify(data)
	except Exception as e:
		return("Whoops. An error was found:"+ "\n" + str(e))

@app.route('/infoUserAdmin/<user_id>')
def infoUserAdmin(user_id):
	try:
		userid = user_id
		cDict, connDict = connectionDict()
		cDict.execute("""SELECT email, fullname, telephone, user_id, username, visitcount FROM user WHERE user_id=%s""", (userid,))
		dataUser = cDict.fetchall()
		return jsonify(dataUser)
	except Exception as e:
		return("Whoops. An error was found:"+ "\n" + str(e))

@app.route('/infoResaAdmin/<resa_id>')
def infoResaAdmin(resa_id):
	try:
		resaid = resa_id
		cDict, connDict = connectionDict()
		cDict.execute("""SELECT creationdate, dateend, status, comment, total FROM resa WHERE resa_id=%s""", (resaid,))
		dataresa = cDict.fetchall()
		return jsonify(dataresa)
	except Exception as e:
		return("Whoops. An error was found:"+ "\n" + str(e))

@app.route('/confirmAdmin/<resa_id>')
def confirmAdmin(resa_id):
	try:
		resaid = resa_id
		today = time.strftime("%Y-%m-%d")
		c, conn = connection()
		c.execute("""UPDATE resa
				 SET confirmed=%s, status = 2
				 WHERE resa_id=%s""",
				 (today, resaid,))
		conn.commit()
		c.close()
		conn.close()
		gc.collect()

		send_mail(resaid)
		flash("Mail Sent!")
		return redirect(url_for('admin'))

	except Exception as e:
		return("Whoops. An error was found:"+ "\n" + str(e))

@app.route('/rejectAdmin/<page_id>')
def rejectAdmin(page_id):
	pageid = page_id
	c, conn = connection()
	c.execute("""UPDATE resa
				 SET status = 3
				 WHERE resa_id=%s""",
				 (pageid,))
	conn.commit()
	c.close()
	conn.close()
	gc.collect()
	return redirect(url_for('admin'))

@app.route('/deleteAdmin/<page_id>')
def deleteAdmin(page_id):
	pageid = page_id
	today = time.strftime("%Y-%m-%d")
	c, conn = connection()
	c.execute("""UPDATE resa
				 SET cancelled=%s, status = 4
				 WHERE resa_id=%s""",
				 (today, pageid,))
	conn.commit()
	c.close()
	conn.close()
	gc.collect()
	return redirect(url_for('admin'))

@app.route('/archiveAdmin/<page_id>')
def archiveAdmin(page_id):
	pageid = page_id
	today = time.strftime("%Y-%m-%d")
	c, conn = connection()
	c.execute("""UPDATE resa
				 SET closed=%s status = 5
				 WHERE resa_id=%s""",
				 (today, pageid,))
	conn.commit()
	c.close()
	conn.close()
	gc.collect()
	return redirect(url_for('admin'))

@app.route('/test/', methods=['GET', 'POST'])
def test():

	
    if request.method == 'POST':
        data = json.loads(request.form.get('data'))
        ss = data['messageClient']
        return str(ss)
    return render_template('test.html')



@app.route('/dashboardAdmin/', methods=['GET', 'POST'])
@login_required
def dashboardAdmin():
	try:
		if session['administrator'] != True:
			flash("You don't have administrator privileges")
			return redirect(url_for('dashboard'))

		elif request.method == 'GET':
  	  		return render_template('dashboardAdmin.html')

	except Exception as e:
		raise e

@app.route('/getUserList/', methods=['GET', 'POST'])
@login_required
def getUserList():
	try:
		if session['administrator'] != True:
			flash("You don't have administrator privileges")
			return redirect(url_for('dashboard'))

		elif request.method == 'GET':
			cDict, connDict = connectionDict()
			cDict.execute("""SELECT email, fullname, telephone, user_id, username FROM user""")
			data = cDict.fetchall()	
			return jsonify(data)
	
	except Exception as e:
		return("Whoops" + str(e))

@app.route('/userList/', methods=['GET', 'POST'])
@login_required
def userList():
	try:
		if session['administrator'] != True:
			flash("You don't have administrator privileges")
			return redirect(url_for('dashboard'))

		elif request.method == 'GET':
			return render_template("userList.html")
	
		elif request.method == 'POST':
			
			session['user_id'] = request.form['idUser']
			dates = request.form['datefilter']
			startDate = request.form['startDate']
			endDate = request.form['endDate']
			days = request.form['days']
			user_id = session['user_id']
			now = datetime.now(pytz.timezone('Europe/Amsterdam'))
			c, conn = connection()

			c.execute("""INSERT INTO resa 
						 (user_id, creationdate, dates, datestart, dateend, days, people, status, total) 
						 VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)""",
						 (session['user_id'], now.strftime("%y-%m-%d %H:%M:%S"), dates, startDate, endDate, days, 1, 0, 0))

			conn.commit()
			c.close()
			conn.close()
			gc.collect()
			
			return redirect(url_for("gearAdmin"))


	except Exception as e:
		return("Whoops" + str(e))


@app.route('/sendAdmin', methods=['GET', 'POST'])
def sendAdmin():
	try:
		if session['administrator'] != True:
			flash("You don't have administrator privileges")
			return redirect(url_for('dashboard'))
		
		elif request.method == 'POST':
			telephone = request.form['telephone']
			dates = request.form['datefilter']
			startDate = request.form['startDate']
			endDate = request.form['endDate']
			days = request.form['days']
			email = request.form['emailAdmin']
			name = request.form['name0']
			now = datetime.now(pytz.timezone('Europe/Amsterdam'))
			c, conn = connection()
			c.execute ("""INSERT INTO user (fullname, email, telephone, creationdate)
						  VALUES (%s, %s, %s, %s)""",
						  ([thwart(name)], [thwart(email)], [thwart(telephone)], now.strftime("%y-%m-%d")))
	   		conn.commit()
			c.close()
			conn.close()
			gc.collect()
			c,conn = connection()
			x = c.execute("""SELECT * FROM user 
					 ORDER BY user_id DESC""")
			user_id = c.fetchone()[0]
			c.close()
			conn.close()
			gc.collect()
			session['user_id'] = user_id
			c, conn = connection()
			c.execute("""INSERT INTO resa 
						 (user_id, creationdate, dates, datestart, dateend, days, people, status, total) 
						 VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)""",
						 (user_id, now.strftime("%y-%m-%d %H:%M:%S"), dates, startDate, endDate, days, 1, 0, 0))

			conn.commit()
			c.close()
			conn.close()
			gc.collect()
			
			return redirect(url_for("gearAdmin"))
	except Exception as e:
		raise e


@app.route('/gearAdmin/', methods=['GET', 'POST'])
@login_required
def gearAdmin():
	
	try:
		c, conn = connection()
		x = c.execute("""SELECT * FROM resa 
					 WHERE user_id=%s
					 ORDER BY resa_id DESC""", 
					 (session['user_id'],))
		x = c.fetchone()
		session['resa_id'] = x[0]
		dates = x[3]
		datestart = x[4]
		dateend = x[5]
		days = x[6]
		people = x[7]
		total = float(x[14])
		c.close()
		conn.close()
		gc.collect()
		
		if request.method == "GET":
			
			return render_template("gear.html", username=session['username'], resa_id=session['resa_id'],
									dates=dates, days=days, people=people, peopleCount=peopleCount, total=total)


		elif request.method == "POST":

			price = float(request.form['total'])
			total += price
			name = request.form['nameUni']
			mbPack = request.form['montBlancPack']
			gaillandKit = request.form['gaillandsPack']
			viaFerrataKit = request.form['viaFerrataPack']
			alpBoots = request.form['alpinismShoes']

			if alpBoots == "1":
				alpBootSize = request.form['alpinismShoeSize']
			else:
				alpBootSize = "0"
			crampons = request.form['crampons']
			iceCrampon = request.form['cramponGlace']
			iceAxe = request.form['piolet']
			helmet = request.form['casque']
			harness = request.form['harness']
			gaiters = request.form['gaiters']
			poles = request.form['poles']
			backpack = request.form['backpack']
			techIceAxes = request.form['pioletGlace']
			climbingShoes = request.form['climbingShoes']
			kidClimbingShoes = request.form['kidClimbingShoes']
			viaFerrataShock = request.form['shockAbsorber']
			crashpad = request.form['crashpad']
			slackline = request.form['slackline']
			hikingShoes = request.form['hikingShoes']
			babyCarrier = request.form['babyCarrier']
			stroller = request.form['babyStroller']

			if request.form['casqueClimb'] == "1":
				helmet = "1"
			if request.form['harnessClimb'] == "1":
				harness = "1"
			if request.form['cramponsHike'] == "1":
				crampons = "1"
			if request.form['polesHike'] == "1":
				poles = "1"
			if request.form['backpackHike'] == "1":
				backpack = "1"


			c, conn = connection()
			c.execute("""UPDATE resa
						SET total = %s
						WHERE resa_id = %s""",
						(total, session['resa_id'],))
			c.execute("""INSERT INTO resauni 
						 (resa_id, user_id, name, datestart, dateend, days, price,
						  mbPack, gaillandKit, viaFerrataKit,
						  alpBoots, alpBootSize, crampons, iceAxe, iceCrampon, helmet, harness, gaiters, poles, techIceAxes, backpack,
						  climbingShoes, kidClimbingShoes, viaFerrataShock, crashpad, slackline,
						  hikingShoes, babyCarrier, stroller)
						 VALUES (%s, %s, %s, %s, %s, %s, %s,	
						 		 %s, %s, %s, 	
						 		 %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,	
						 		 %s, %s, %s, %s, %s,	
						 		 %s, %s, %s)""",	
						 (session['resa_id'], session['user_id'], name, datestart, dateend, days, price,
						  mbPack, gaillandKit, viaFerrataKit,
						  alpBoots, alpBootSize, crampons, iceAxe, iceCrampon, helmet, harness, gaiters, poles, techIceAxes, backpack,
						  climbingShoes, kidClimbingShoes, viaFerrataShock, crashpad, slackline,
						  hikingShoes, babyCarrier, stroller))
			conn.commit()
			c.close()
			conn.close()
			gc.collect()

			return redirect(url_for('postAdmin'))


	
	except Exception as e:
	 	return("whoopsee " + str(e))

@app.route('/postAdmin/', methods=['GET', 'POST'])
@login_required
def postAdmin():
	try:
		if request.method == "GET":
			username = session['username']
			resa_id = session['resa_id']
			cDict, connDict = connectionDict()
			cDict.execute("""SELECT * FROM resauni
						 		WHERE resa_id=%s""",
						 		(session['resa_id'],))
			data = cDict.fetchall()
			c,conn = connection()
			c.execute("""SELECT total FROM resa
						 		WHERE resa_id=%s""",
						 		(session['resa_id'],))
			total = c.fetchone()[0]
			c.execute("""SELECT telephone FROM user
						 WHERE user_id=%s""",
						 (session['user_id'],))
			telephone = c.fetchone()[0]
			
			count = 0
			for e in data:
				count += 1
			return render_template('post.html', data=data, resa_id=resa_id, count=count, total=total, telephone=telephone)

		elif request.method == "POST":
			comment = request.form['comment']
			telephone = request.form['telephone']
			cDict, connDict = connectionDict()
			cDict.execute("""SELECT * FROM resauni
						 		WHERE resa_id=%s""",
						 		(session['resa_id'],))
			data = cDict.fetchall()
			count = 0
			for e in data:
				count += 1
			today = time.strftime("%Y-%m-%d")
			c,conn = connection()
			c.execute("""UPDATE resa
						 SET status = 1, comment = %s, people= %s, active= %s
				 		 WHERE resa_id = %s""",
				 		 (comment, count, today, session['resa_id'],))

			c.execute("""UPDATE user
						 SET telephone = %s
						 WHERE user_id = %s""",
						 (telephone, session['user_id'],))
			conn.commit()
			c.close()
			conn.close()
			gc.collect()
			flash("Success! Your reservation is complete")
			return redirect(url_for('admin'))


	except Exception as e:
		return("Whoops" + str(e))

if __name__=="__main__":
	#app.secret_key = 'whatever'
	app.run()

#status  0: Not active
#		 1: Active not confirmed
#		 2: Active and confirmed
#		 3: Active and not accepted
#		 4: Deleted
#		 5: Closed

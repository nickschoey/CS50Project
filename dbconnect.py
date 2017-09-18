import MySQLdb
import MySQLdb.cursors

def connection():
	conn = MySQLdb.connect(host="localhost", user="root", passwd="1160252", db="users")
	c = conn.cursor()


	return(c, conn)

def connectionDict():
	conn = MySQLdb.connect(host="localhost", user="root", passwd="1160252", db="users", cursorclass=MySQLdb.cursors.DictCursor)
	c = conn.cursor()

	return(c, conn)
import bcrypt
from connection import connection_handler
from datetime import datetime


def hash_password(plain_text_password):
    # By using bcrypt, the salt is saved into the hash itself
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')


@connection_handler
def register_new_user(cursor, new_user):
    pw_to_hash = new_user['password']
    hashed_pw = hash_password(pw_to_hash)
    new_user['hashed_pw'] = hashed_pw

    dt = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    new_user['reg_date'] = str(dt)

    cursor.execute("""
        INSERT INTO registered_users (username, hashed_pw, reg_date)
        VALUES (%(username)s, %(hashed_pw)s, %(reg_date)s);
        """, new_user)


@connection_handler
def check_username_in_database(cursor, new_user):
    cursor.execute("""
        SELECT * FROM registered_users
        WHERE username=%(username)s;
        """, new_user)
    username = cursor.fetchall()

    if len(username) == 0:
        return False
    else:
        return True


def verify_password(plain_text_password, hashed_password):
    this_was_hashed = plain_text_password
    hashed_bytes_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(this_was_hashed.encode('utf-8'), hashed_bytes_password)


@connection_handler
def verify_user(cursor, login_data):
    cursor.execute("""
        SELECT * FROM registered_users
        WHERE username=%(username)s;
        """, login_data)

    stored_hash_password = cursor.fetchall()

    if len(stored_hash_password) == 0:
        return False
    else:
        password = login_data['password']
        stored_hash_password_from_db = stored_hash_password[0]['hashed_pw']
        pw_check = verify_password(password, stored_hash_password_from_db)
        return pw_check


@connection_handler
def get_user_id_by_username(cursor, username):
    user = dict()
    user['username'] = username

    cursor.execute("""
        SELECT * FROM registered_users
        WHERE username=%(username)s;
        """, user)
    user_id = cursor.fetchall()
    return user_id[0]['id']

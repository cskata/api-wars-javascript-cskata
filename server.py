from flask import Flask, render_template, redirect, session, request, url_for, jsonify, flash
import data_manager

app = Flask(__name__)
app.secret_key = "titkoskulcs"


@app.route('/')
def index():
    if 'username' not in session:
        return render_template('index.html')
    else:
        login_status = True

        username = session['username']
        user_id = data_manager.get_user_id_by_username(username)
        session['user_id'] = user_id

        return render_template('index.html', login_status=login_status, username=username, user_id=user_id)


@app.route('/registration', methods=['GET', 'POST'])
def new_user_registration():
    if request.method == 'POST':
        new_user = {
            'username': request.form['new_username'],
            'password': request.form['new_password']
        }

        is_username_taken = data_manager.check_username_in_database(new_user)

        if is_username_taken:
            flash("Username is already taken, please choose something else.")
            return redirect(url_for('new_user_registration'))
        else:
            data_manager.register_new_user(new_user)
            flash("Registration was successful!")
            return redirect(url_for('index'))

    return render_template('registration.html')


@app.route('/login', methods=['POST'])
def log_in_user():
    login_data = {
        'username': request.form['username'],
        'password': request.form['password']
    }

    login_check = data_manager.verify_user(login_data)

    if login_check:
        session['username'] = login_data['username']
        return redirect(url_for('index'))

    flash("Invalid username or password!")
    return render_template('index.html')


@app.route('/logout')
def log_user_out():
    session.pop('username', None)
    return redirect(url_for('index'))


@app.route('/voting', methods=['GET'])
def show_and_save_votes():
    user_id = session['user_id']
    votes = data_manager.get_votes_by_user_id(user_id)
    return jsonify(votes)


@app.route('/voting', methods=['POST'])
def show_and_save_votes():
    response = request.get_json()
    data_manager.save_planet_vote(response)
    return jsonify(response)


if __name__ == '__main__':
    app.debug = True
    app.run()

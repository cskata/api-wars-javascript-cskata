from flask import Flask, render_template, redirect, session, request, url_for
import data_manager

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/registration', methods=['GET', 'POST'])
def new_user_registration():
    if request.method == 'POST':
        new_user = {
            'username': request.form['new_username'],
            'password': request.form['new_password']
        }

        is_username_taken = data_manager.check_username_in_database(new_user)

        if is_username_taken:
            message = "That username is already taken, please choose something else."
            return render_template('registration.html', message=message)
        else:
            data_manager.register_new_user(new_user)
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
        return redirect(url_for('show_user_profile'))
    else:
        return redirect(url_for('index'))


@app.route('/logout')
def log_user_out():
    session.pop('username', None)
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.debug = True
    app.run()

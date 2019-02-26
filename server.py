from flask import Flask, render_template, redirect, session, request, url_for, jsonify
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
        return render_template('index.html', login_status=login_status, username=username)


@app.route('/registration/<new_user>', methods=['GET'])
def check_username_availability(new_user):
    result = data_manager.check_username_in_database(new_user)
    return jsonify(result)


@app.route('/registration', methods=['POST'])
def new_user_registration():
    new_user = request.get_json()
    data_manager.register_new_user(new_user)
    return jsonify(new_user)


@app.route('/login/<username>/<password>', methods=['GET'])
def check_login_data(username, password):
    result = data_manager.verify_user(username, password)
    if result is True:
        session['username'] = username
    return jsonify(result)


@app.route('/logout')
def log_user_out():
    session.pop('username', None)
    return redirect(url_for('index'))


@app.route('/voting/<username>', methods=['GET'])
def show_votes(username):
    user_id = data_manager.get_user_id_by_username(username)
    votes = data_manager.get_votes_by_user_id(user_id)
    return jsonify(votes)


@app.route('/voting', methods=['POST'])
def save_votes():
    response = request.get_json()
    data_manager.save_planet_vote(response)
    return jsonify(response)


if __name__ == '__main__':
    app.debug = True
    app.run()

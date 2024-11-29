from flask import Blueprint, render_template, request, redirect, url_for
from .models import db, UserData

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/result', methods=['POST'])
def result():
    weight = float(request.form['weight'])
    height = float(request.form['height'])
    age = int(request.form['age'])
    gender = request.form['gender']
    activity_level = request.form['activity_level']

    # Расчет калорийности (примерная формула).
    if gender == 'male':
        bmr = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)
    else:
        bmr = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)

    # Множитель активности.
    activity_multipliers = {
        'sedentary': 1.2,
        'lightly_active': 1.375,
        'moderately_active': 1.55,
        'very_active': 1.725,
        'extra_active': 1.9
    }

    recommended_calories = bmr * activity_multipliers.get(activity_level, 1.2)

    user_data = UserData(
        weight=weight,
        height=height,
        age=age,
        gender=gender,
        activity_level=activity_level,
        recommended_calories=recommended_calories
    )
    db.session.add(user_data)
    db.session.commit()

    return render_template('result.html', calories=recommended_calories)

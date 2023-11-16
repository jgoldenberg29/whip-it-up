from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', first_name='Demo', last_name='User')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', first_name='Marnie', last_name='Kurr')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', first_name='Bobby', last_name='Buster')
    user1 = User(
    username='alice', email='alice@email.com', password='password123', first_name='Alice', last_name='Anderson')

    user2 = User(
        username='bob', email='bob@email.com', password='securepass', first_name='Bob', last_name='Brown')

    user3 = User(
        username='charlie', email='charlie@email.com', password='myp@ssword', first_name='Charlie', last_name='Clark')

    user4 = User(
        username='diana', email='diana@email.com', password='d1@naP@ss', first_name='Diana', last_name='Davis')

    user5 = User(
        username='edward', email='edward@email.com', password='p@ssw0rd', first_name='Edward', last_name='Evans')

    user6 = User(
        username='fiona', email='fiona@email.com', password='fionapass', first_name='Fiona', last_name='Fisher')

    user7 = User(
        username='george', email='george@email.com', password='gpass123', first_name='George', last_name='Gomez')

    user8 = User(
        username='hannah', email='hannah@email.com', password='hannah123', first_name='Hannah', last_name='Howard')

    user9 = User(
        username='ian', email='ian@email.com', password='ianpass', first_name='Ian', last_name='Irwin')

    user10 = User(
        username='jessica', email='jessica@email.com', password='jessicapw', first_name='Jessica', last_name='Jackson')

    user11 = User(
    username='sakura', email='sakura@email.com', password='sakura123', first_name='Sakura', last_name='Yamamoto')

    user12 = User(
        username='mohammed', email='mohammed@email.com', password='mohammedpass', first_name='Mohammed', last_name='Khan')

    user13 = User(
        username='leila', email='leila@email.com', password='leilapw', first_name='Leila', last_name='Khouri')

    user14 = User(
        username='juan', email='juan@email.com', password='juanpass', first_name='Juan', last_name='Rodriguez')

    user15 = User(
        username='ali', email='ali@email.com', password='alipass', first_name='Ali', last_name='Choudhury')

    user16 = User(
        username='ximena', email='ximena@email.com', password='ximenapw', first_name='Ximena', last_name='Lopez')

    user17 = User(
        username='rafiq', email='rafiq@email.com', password='rafiqpass', first_name='Rafiq', last_name='Abdullah')

    user18 = User(
        username='lakisha', email='lakisha@email.com', password='lakishapw', first_name='LaKisha', last_name='Jones')

    user19 = User(
        username='amara', email='amara@email.com', password='amarapass', first_name='Amara', last_name='Nwosu')

    user20 = User(
        username='ji-won', email='jiwon@email.com', password='jiwonpass', first_name='Ji-Won', last_name='Kim')



    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)
    db.session.add(user5)
    db.session.add(user6)
    db.session.add(user7)
    db.session.add(user8)
    db.session.add(user9)
    db.session.add(user10)
    db.session.add(user11)
    db.session.add(user12)
    db.session.add(user13)
    db.session.add(user14)
    db.session.add(user15)
    db.session.add(user16)
    db.session.add(user17)
    db.session.add(user18)
    db.session.add(user19)
    db.session.add(user20)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()

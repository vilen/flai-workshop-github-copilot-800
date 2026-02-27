from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from .models import User, Team, Activity, Leaderboard, Workout
from datetime import date


class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='ironman',
            email='tony@avengers.com',
            password='password123'
        )

    def test_user_creation(self):
        self.assertEqual(self.user.username, 'ironman')
        self.assertEqual(self.user.email, 'tony@avengers.com')

    def test_user_str(self):
        self.assertEqual(str(self.user), 'ironman')


class TeamModelTest(TestCase):
    def setUp(self):
        self.team = Team.objects.create(
            name='Team Marvel',
            members=['ironman', 'captainamerica', 'thor']
        )

    def test_team_creation(self):
        self.assertEqual(self.team.name, 'Team Marvel')
        self.assertIn('ironman', self.team.members)

    def test_team_str(self):
        self.assertEqual(str(self.team), 'Team Marvel')


class ActivityModelTest(TestCase):
    def setUp(self):
        self.activity = Activity.objects.create(
            user='ironman',
            activity_type='Running',
            duration='30 minutes',
            date=date(2024, 1, 10)
        )

    def test_activity_creation(self):
        self.assertEqual(self.activity.user, 'ironman')
        self.assertEqual(self.activity.activity_type, 'Running')

    def test_activity_str(self):
        self.assertEqual(str(self.activity), 'ironman - Running')


class LeaderboardModelTest(TestCase):
    def setUp(self):
        self.entry = Leaderboard.objects.create(
            user='ironman',
            score=950
        )

    def test_leaderboard_creation(self):
        self.assertEqual(self.entry.user, 'ironman')
        self.assertEqual(self.entry.score, 950)

    def test_leaderboard_str(self):
        self.assertEqual(str(self.entry), 'ironman - 950')


class WorkoutModelTest(TestCase):
    def setUp(self):
        self.workout = Workout.objects.create(
            name='Arc Reactor Cardio',
            description='High-intensity cardio inspired by Iron Man',
            duration='30 minutes'
        )

    def test_workout_creation(self):
        self.assertEqual(self.workout.name, 'Arc Reactor Cardio')
        self.assertEqual(self.workout.duration, '30 minutes')

    def test_workout_str(self):
        self.assertEqual(str(self.workout), 'Arc Reactor Cardio')


class UserAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='ironman',
            email='tony@avengers.com',
            password='password123'
        )

    def test_get_users(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user(self):
        data = {'username': 'thor', 'email': 'thor@avengers.com', 'password': 'password123'}
        response = self.client.post('/api/users/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TeamAPITest(APITestCase):
    def setUp(self):
        self.team = Team.objects.create(
            name='Team Marvel',
            members=['ironman', 'captainamerica']
        )

    def test_get_teams(self):
        response = self.client.get('/api/teams/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ActivityAPITest(APITestCase):
    def setUp(self):
        self.activity = Activity.objects.create(
            user='ironman',
            activity_type='Running',
            duration='30 minutes',
            date=date(2024, 1, 10)
        )

    def test_get_activities(self):
        response = self.client.get('/api/activities/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class LeaderboardAPITest(APITestCase):
    def setUp(self):
        self.entry = Leaderboard.objects.create(user='ironman', score=950)

    def test_get_leaderboard(self):
        response = self.client.get('/api/leaderboard/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class WorkoutAPITest(APITestCase):
    def setUp(self):
        self.workout = Workout.objects.create(
            name='Arc Reactor Cardio',
            description='High-intensity cardio',
            duration='30 minutes'
        )

    def test_get_workouts(self):
        response = self.client.get('/api/workouts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class APIRootTest(APITestCase):
    def test_api_root(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('users', response.data)
        self.assertIn('teams', response.data)
        self.assertIn('activities', response.data)
        self.assertIn('leaderboard', response.data)
        self.assertIn('workouts', response.data)

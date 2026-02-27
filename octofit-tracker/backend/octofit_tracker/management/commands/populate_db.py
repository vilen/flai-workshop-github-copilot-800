from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import date


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Clearing existing data...')
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        Team.objects.all().delete()
        User.objects.all().delete()
        Workout.objects.all().delete()

        self.stdout.write('Creating users...')
        users = [
            User(username='ironman', email='tony@avengers.com', password='password123'),
            User(username='captainamerica', email='steve@avengers.com', password='password123'),
            User(username='thor', email='thor@avengers.com', password='password123'),
            User(username='blackwidow', email='natasha@avengers.com', password='password123'),
            User(username='hulk', email='bruce@avengers.com', password='password123'),
            User(username='batman', email='bruce@dcheroes.com', password='password123'),
            User(username='superman', email='clark@dcheroes.com', password='password123'),
            User(username='wonderwoman', email='diana@dcheroes.com', password='password123'),
            User(username='theflash', email='barry@dcheroes.com', password='password123'),
            User(username='aquaman', email='arthur@dcheroes.com', password='password123'),
        ]
        for user in users:
            user.save()
        self.stdout.write(self.style.SUCCESS(f'Created {len(users)} users'))

        self.stdout.write('Creating teams...')
        marvel_members = [u.username for u in users[:5]]
        dc_members = [u.username for u in users[5:]]

        team_marvel = Team(name='Team Marvel', members=marvel_members)
        team_marvel.save()

        team_dc = Team(name='Team DC', members=dc_members)
        team_dc.save()
        self.stdout.write(self.style.SUCCESS('Created 2 teams'))

        self.stdout.write('Creating activities...')
        activities = [
            Activity(user='ironman', activity_type='Running', duration='30 minutes', date=date(2024, 1, 10)),
            Activity(user='captainamerica', activity_type='Cycling', duration='45 minutes', date=date(2024, 1, 11)),
            Activity(user='thor', activity_type='Weightlifting', duration='60 minutes', date=date(2024, 1, 12)),
            Activity(user='blackwidow', activity_type='Yoga', duration='30 minutes', date=date(2024, 1, 13)),
            Activity(user='hulk', activity_type='Swimming', duration='40 minutes', date=date(2024, 1, 14)),
            Activity(user='batman', activity_type='Martial Arts', duration='60 minutes', date=date(2024, 1, 10)),
            Activity(user='superman', activity_type='Flying', duration='20 minutes', date=date(2024, 1, 11)),
            Activity(user='wonderwoman', activity_type='Sword Training', duration='45 minutes', date=date(2024, 1, 12)),
            Activity(user='theflash', activity_type='Running', duration='10 minutes', date=date(2024, 1, 13)),
            Activity(user='aquaman', activity_type='Swimming', duration='50 minutes', date=date(2024, 1, 14)),
        ]
        for activity in activities:
            activity.save()
        self.stdout.write(self.style.SUCCESS(f'Created {len(activities)} activities'))

        self.stdout.write('Creating leaderboard...')
        leaderboard_entries = [
            Leaderboard(user='ironman', score=950),
            Leaderboard(user='captainamerica', score=870),
            Leaderboard(user='thor', score=920),
            Leaderboard(user='blackwidow', score=800),
            Leaderboard(user='hulk', score=860),
            Leaderboard(user='batman', score=910),
            Leaderboard(user='superman', score=980),
            Leaderboard(user='wonderwoman', score=940),
            Leaderboard(user='theflash', score=990),
            Leaderboard(user='aquaman', score=820),
        ]
        for entry in leaderboard_entries:
            entry.save()
        self.stdout.write(self.style.SUCCESS(f'Created {len(leaderboard_entries)} leaderboard entries'))

        self.stdout.write('Creating workouts...')
        workouts = [
            Workout(
                name='Arc Reactor Cardio',
                description='High-intensity cardio inspired by Iron Man\'s arc reactor energy',
                duration='30 minutes'
            ),
            Workout(
                name='Super Soldier Strength',
                description='Full-body strength training based on Captain America\'s regimen',
                duration='45 minutes'
            ),
            Workout(
                name='Asgardian Power',
                description='Heavy lifting and battle conditioning like Thor\'s Asgardian training',
                duration='60 minutes'
            ),
            Workout(
                name='Dark Knight Endurance',
                description='Endurance and combat training modeled after Batman\'s intense regimen',
                duration='60 minutes'
            ),
            Workout(
                name='Speed Force Sprint',
                description='Lightning-fast sprint intervals inspired by The Flash\'s speed force',
                duration='20 minutes'
            ),
        ]
        for workout in workouts:
            workout.save()
        self.stdout.write(self.style.SUCCESS(f'Created {len(workouts)} workouts'))

        self.stdout.write(self.style.SUCCESS('Database populated successfully with superhero test data!'))

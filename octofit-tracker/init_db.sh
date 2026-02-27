#!/bin/bash
set -e

WORKSPACE="/workspaces/flai-workshop-github-copilot-800"
VENV="$WORKSPACE/octofit-tracker/backend/venv"
MANAGE="$WORKSPACE/octofit-tracker/backend/octofit_tracker/manage.py"

echo "=== Step 1: Ensure MongoDB is running ==="
if ! ps aux | grep mongod | grep -v grep > /dev/null; then
    echo "Starting MongoDB..."
    sudo service mongod start
    sleep 2
else
    echo "MongoDB is already running."
fi

echo ""
echo "=== Step 2: Run makemigrations ==="
$VENV/bin/python $MANAGE makemigrations

echo ""
echo "=== Step 3: Run migrate ==="
$VENV/bin/python $MANAGE migrate

echo ""
echo "=== Step 4: Populate database ==="
$VENV/bin/python $MANAGE populate_db

echo ""
echo "=== Step 5: Create unique index on users.email ==="
mongosh octofit_db --eval 'db.users.createIndex({ "email": 1 }, { unique: true })'

echo ""
echo "=== Step 6: Verify collections ==="
mongosh octofit_db --eval 'db.getCollectionNames()'

echo ""
echo "=== Step 7: Sample documents ==="
echo "--- users ---"
mongosh octofit_db --eval 'db.users.find().limit(2).pretty()'

echo "--- teams ---"
mongosh octofit_db --eval 'db.teams.find().pretty()'

echo "--- activities ---"
mongosh octofit_db --eval 'db.activities.find().limit(2).pretty()'

echo "--- leaderboard (top 3) ---"
mongosh octofit_db --eval 'db.leaderboard.find().sort({score:-1}).limit(3).pretty()'

echo "--- workouts ---"
mongosh octofit_db --eval 'db.workouts.find().limit(2).pretty()'

echo ""
echo "=== Done! ==="
echo "Django REST API endpoints:"
echo "  http://localhost:8000/"
echo "  http://localhost:8000/api/users/"
echo "  http://localhost:8000/api/teams/"
echo "  http://localhost:8000/api/activities/"
echo "  http://localhost:8000/api/leaderboard/"
echo "  http://localhost:8000/api/workouts/"

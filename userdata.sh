#!/bin/bash

sudo yum update -y

sudo yum install git -y

git --version

git config --global user.name “Uknown”
git config --global user.email “your_email@example.com”

sudo yum install -y docker
sudo service docker start

usermod -a -G docker ec2-user

# set env variables
export SPACES_ACCESS_KEY=$(aws --region=us-east-1 ssm get-parameter --name 'spaces_access_key' --query 'Parameter.Value')
export SPACES_SECRET=$(aws --region=us-east-1 ssm get-parameter --name 'spaces_secret' --query 'Parameter.Value')
export GITHUB_PAT=$(aws --region=us-east-1 ssm get-parameter --name 'github_ec2_pat' --query 'Parameter.Value')

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

docker-compose --version

su ec2-user
cd /home/ec2-user
mkdir source
cd source
git clone https://github.com/shekelator/sites-infra.git
cd sites-infra

# authenticate with github packages
echo $GITHUB_PAT | docker login https://docker.pkg.github.com -u shekelator --password-stdin
docker-compose up -d --pull always

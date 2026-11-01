## Docker on AWS (ECR + ECS)

- What is Virtualization? Running multiple isolated virtual machines (or containers) on one physical machine
- **Docker:** [Learn Docker & Deploy to AWS - Beginner Tutorial](https://www.youtube.com/watch?v=1_AlV-FFxM8)
  - AWS CLI config
  - Docker Build (pass tag of next image)
  - Check login credentials
  - docker push (same tag)
  - **ECR (Elastic Container Registry):** to check the image number and sizes
  - **ECS (Elastic Container Service):** to update the task definition to the latest image & then deploy the latest definition in clusters
  - **Cloudwatch:** to check if there are any issues with the models deployed recently
- **Terraform:**
  - Change the number in tfvars file
  - `terraform init`
  - `terraform apply` (git pull whenever necessary)
- **AWS Amplify:** easily deploy your entire react/next website with a ci/cd pipeline from your github itself [Deploying Next.js To AWS Just Got MUCH BETTER!](https://www.youtube.com/watch?v=JxaOW3iDSS4) The only problem is that if you want to deploy a backend/flask endpoint too, you will need an ec2 instance in either case. So why pay for both
- **EC2:** virtual server, gives capacity to run in the cloud

## How to Deploy on AWS EC2

::viz deploy-architecture

### Try sorting the following on local

- Solve all npm build errors (check package.json and everything)
- **Create a Docker Image**
  - Download Docker Desktop
  - Create a dockerfile for your project (depending on codebase)
  - `docker build -t (project name) .` (-t to specify a tag name for the project, . for automatically selecting the dockerfile)
  - If you make some errors, and have to stop the build command somewhere, use this: `docker system prune -a`
  - `docker run -p 3000:3000 (project name)`
- Create separate Dockerfiles if you have your frontend on npm and a python based backend - integrate via docker-compose.yml
  - Mention networks in all the services
  - `docker-compose up --build`
  - `docker logs <container_id>` (to debug, there will be separate for frontend and backend)
  - Restart everything cleanly: `docker-compose down && docker-compose up --build`
  - `docker images` (list of all docker images)
  - PRO Tip: prune it once again on local before deploying (will take up a lot of space)
- **Nginx:** used for reverse proxy (if you want to host both the docker containers on the same domain)
  - Create a nginx.conf file and specify the domain and docker routes
  - (don't copy the nginx file in the vm, keep it in the docker)
  - Make sure you add nginx also in the dockerfile
  - Write code for port 80 for http and 443 for https
  - In order to maintain https also, you need ssl certificates in nginx
    - `sudo certbot certonly --standalone -d axioma.simppl.org --register-unsafely-without-email`
    - Also add the path to ssl certificates in docker compose
  - You will have to redirect http to https, for that, use 301 (permanent; browsers may turn a POST into a GET) or 307/308 (keep POST as POST)
- **Integrate Postgres Backend**
  - Add the username, password, db name, port, host in .env and add those in a db in docker-compose.yml (separate service db)
  - Pruning will not delete the volumes, so if you want to reset the entire docker, `docker system prune -a --volumes`
  - In order to add values in the postgres database (do this inside the docker)
    - `docker exec -it {name of postgres database, default postgres_db} psql -U ${DATABASE_USERNAME} -d ${DATABASE_NAME}`
    - `INSERT INTO users (username, password) VALUES ('new_user', 'secure_password');` (you can perform any sql action as needed; store hashed passwords in a real app)
    - `\q` to exit
  - Make sure you send the database url to the frontend env in docker-compose

### On AWS

- Launch a new instance
  - Select amazon linux/Ubuntu as the image (i chose amazon linux coz i didn't have ubuntu for ssh)
  - Free tier (t3 micro maybe)
  - Create a new key pair (increases security, you get a private key and the server gets a public key) - very important to save .pem file
  - Allow https/http if you want anyone to access your site
  - Configure storage (default 8 GB EBS volume should work)
  - Launch the instance -> status check (all checks should pass)
- Connect to instance via local
  - `icacls "(path to .pem file)" /inheritance:r`
  - `icacls "(path to .pem file)" /grant:r "(your local username):R"`
  - Do both of these for control access (on Windows; on mac/linux use `chmod 400 file.pem`)
  - `ssh -i "(path to .pem file)" ec2-user@(public ip address of instance)`
  - If you are using ubuntu image, replace ec2-user with ubuntu
  - `sudo yum update -y` (just to check if there are any updates)
- Clone Github Repo
- Install, start and enable docker in the instance
  - `sudo yum install -y docker`
  - `sudo systemctl start docker`
  - `sudo systemctl enable docker`
  - `sudo systemctl status docker`
  - `sudo usermod -aG docker $USER` (give docker permissions, you may need to log out and login again)
- Enable docker-compose in the EC2 Instance

```
# 1. Install dependencies
sudo yum update && sudo yum install -y curl jq
# 2. Download Docker Compose binary
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
# 3. Give execute permissions
sudo chmod +x /usr/local/bin/docker-compose
# 4. Verify installation
docker-compose --version
```

- **Final steps**
  - Run build in the backend
  - `docker-compose up --build -d`
  - (if the system crashes during build, just go to your instances, you will find some checks failed, just reboot the instance)
  - You might have to repeat the postgres add data steps
  - Restart the postgres container once
  - `docker ps` to check everything's running
  - If the docker works on localhost, and not on public ip, check that the security group allows inbound traffic on ports 80/443

## GCP and Google Analytics

- **How to set IAM permissions for BigQuery and query it:**
  - Go to the GCP Page post login
  - Console
  - Hamburger menu to the left
  - IAM & Admin
  - Service accounts (Make sure you are in the required project)
  - Select a new account or create a new one
  - Open that account
  - Add key - create new key (a json file will be downloaded)
  - `from google.cloud import bigquery`
  - Set the key in the environment
  - Query the table using sql
- **How to get data from Google Analytics?**
  - `from google.analytics.data_v1beta`
  - You will have to create a BetaAnalyticsDataClient
  - Play around with dimensions and metrics
  - [Connecting to the Google Analytics 4 Reporting API](https://www.youtube.com/watch?v=oRUpAqYqROQ)

## Domains, Caching

- **How to add a custom Subdomain to your website?**
  - Buy a domain name on porkbun, godaddy or some other platform
  - Host your website on netlify, vercel, aws or any such service
  - Go in domain, and add the domain that you just bought
  - You will get ip addresses, dns, you need to paste that in the addresses (where you bought the domain from)
  - In case if you want to add a subdomain, you will have to specify that instead of the domain name (abc.xyz.org) on the deployment platform and add it under cname
- **Redis Caching:** https://www.youtube.com/watch?v=jgpVdJB2sKQ
- GCP Setup

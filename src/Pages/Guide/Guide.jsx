import React, { useEffect, useState } from 'react';
import './Guide.css'
import { useNavigate } from 'react-router-dom';

const Guide = () => {
  const [openStep, setOpenStep] = useState(null);
  const [copiedStep, setCopiedStep] = useState(null);
  const [complete, setComplete] = useState(0)
  const [completedSteps, setCompletedSteps] = useState([]); 
  const navigate = useNavigate()

  const toggleStep = (step) => {
    setOpenStep(openStep === step ? null : step);
  };

  const goBack = () => {
    navigate('/')
  }

  useEffect(() => {
    const totalSteps = commandData.length;
    const completedStepsCount = completedSteps.length;
    const percentage = ((completedStepsCount) / totalSteps) * 100; 
    setComplete(Math.min(percentage, 100).toFixed(0));
  }, [completedSteps]);
  
  
  

  const copyCommand = (command, step) => {
    navigator.clipboard.writeText(command).then(() => {
      setCopiedStep(step);
      setTimeout(() => setCopiedStep(null), 2000);
    });
  };


  const toggleComplete = (step) => {
    setCompletedSteps((prev) =>
      prev.includes(step) ? prev.filter((s) => s !== step) : [...prev, step]
    );
  };

  const commandData = [
    {
      step: 1,
      command: 'sudo apt update && sudo apt upgrade -y',
      explanation: 'Updates the list of available packages and upgrades installed packages to the latest version.'
    },
    {
      step: 2,
      command: 'sudo apt install python3-pip python3-dev python3-venv libpq-dev nginx curl -y',
      explanation: 'Install Python and Dependencies.'
    },
    {
      step: 3,
      command: 'sudo apt install postgresql postgresql-contrib -y',
      explanation: 'postgresql: Installs the PostgreSQL database server. postgresql-contrib: Adds additional tools and utilities for PostgreSQL.'
    },
    {
      step: 4,
      command: `python3 -m venv venv 
source venv/bin/activate`,
      explanation: 'Create a Virtual Environment and Activate it'
    },
    {
      step: 5,
      command: `git clone < your repo ssh >`,
      explanation: 'Clone Your Project.'
    },
    {
      step: 6,
      command: `pip install --upgrade pip
pip install -r requirements.txt
`,
      explanation: `pip install --upgrade pip: Updates pip to its latest version.
pip install -r requirements.txt: Installs Python packages listed in requirements.txt.`
    },
    {
      step: 7,
      command: `ALLOWED_HOSTS = ['example.com', 'www.example.com', 'your-ip-address']`,
      explanation: `Allowed Hosts in settings.py:`
    },
    {
      step: 8,
      command: `sudo -u postgres psql`,
      explanation: 'sudo -u postgres psql: Logs into the PostgreSQL interactive terminal as the postgres superuser.'
    },
    {
      step: 9,
      command: `CREATE DATABASE mydb;
      CREATE USER myuser WITH PASSWORD 'mypassword';
      ALTER ROLE myuser SET client_encoding TO 'utf8';
      ALTER ROLE myuser SET default_transaction_isolation TO 'read committed';
      ALTER ROLE myuser SET timezone TO 'UTC';
      GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;
      \q
      `,
      explanation: `CREATE DATABASE mydb;: Creates a new database named mydb.
      CREATE USER myuser WITH PASSWORD 'mypassword';: Creates a new user with login privileges.
      ALTER ROLE commands: Sets encoding, transaction isolation, and timezone for best performance.
      GRANT ALL PRIVILEGES: Gives full control of the database to the user.
      \q: Exits the PostgreSQL shell.`
    },
    {
      step: 10,
      command: `DATABASES = {
                  'default': {
                      'ENGINE': 'django.db.backends.postgresql',
                      'NAME': DB_NAME,
                      'USER': DB_USER,
                      'PASSWORD': DB_PASSWORD,
                      'HOST': DB_HOST,
                      'PORT': DB_PORT,
                        }
                    }
                    `,
      explanation: `Make the Changes to the Settings`
    },
    {
      step: 11,
      command: `python manage.py collectstatic`,
      explanation: ` Collects static files into a single folder for deployment.`
    },
    {
      step: 12,
      command: `python manage.py migrate`,
      explanation: `Make the migrations`
    },
    {
      step: 13,
      command: `pip install gunicorn`,
      explanation: `A Python WSGI HTTP server for running Django applications in production.`
    },
    {
      step: 14,
      command: `gunicorn --bind 0.0.0.0:8000 myproject.wsgi`,
      explanation: `--bind 0.0.0.0:8000: Runs the server on all network interfaces at port 8000.
myproject.wsgi: Specifies the WSGI entry point for Django.`
    },
    {
      step: 15,
      command: `sudo nano /etc/systemd/system/gunicorn.service`,
      explanation: `Opens a new service file where you define how Gunicorn runs as a system service.`
    },
    {
      step: 16,
      command: `[Unit]
Description=Gunicorn Daemon for Django Project
After=network.target

[Service]
User=django-user
Group=www-data
WorkingDirectory=/home/django-user/your_project
ExecStart=/home/django-user/venv/bin/gunicorn --workers 3 --bind 127.0.0.1:8000 myproject.wsgi:application

[Install]
WantedBy=multi-user.target
`,
      explanation: `This defines Gunicorn to run as a background service. 
      Make sure the path are correct`
    },
    {
      step: 17,
      command: `sudo systemctl daemon-reload
sudo systemctl start gunicorn
sudo systemctl enable gunicorn

`,
      explanation: `daemon-reload: Reloads systemd to recognize the new service.
start: Starts the Gunicorn service.
enable: Enables the service to start automatically on boot.`
    },
    {
      step: 18,
      command: `sudo nano /etc/nginx/sites-available/myproject`,
      explanation: `Creates a new Nginx configuration file for your project. Replace myproject with your project name`
    },
    {
      step: 19,
      command: `server {
    listen 80;
    server_name ADD YOUR PUBLIC/PRIVATE IP;

    location /static/ {
        alias /home/django-user/your_project/static/;
    }

    location /media/ {
        alias /home/django-user/your_project/media/;
    }

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
`,
      explanation: `Configures Nginx to the (IP) and the serve static/media files and proxy requests to Gunicorn. Make sure the paths are correct re check it`
    },
    {
      step: 20,
      command: `sudo ln -s /etc/nginx/sites-available/your_project /etc/nginx/sites-enabled
sudo nginx -t
sudo systemctl restart nginx

`,
      explanation: `sudo ln -s /etc/nginx/sites-available/your_project /etc/nginx/sites-enabled:
Creates a symbolic link of your project’s NGINX config from sites-available to sites-enabled, enabling it.                         

sudo nginx -t:
Tests the NGINX configuration for syntax errors.

sudo systemctl restart nginx:
Restarts NGINX to apply the new configuration. 
Make sure the paths are correct`
    },
    {
      step: 21,
      command: `ssudo systemctl status gunicorn
sudo systemctl status nginx
`,
      explanation: `Check Status`
    },
    {
      step: 22,
      command: `sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
`,
      explanation: `Add Certbot repository.
Update package list.
Install Certbot with NGINX support.
Obtain SSL certificates for your domain using Certbot. Replace mydomain with your domain name`
    },
    {
      step: 23,
      command: `sudo systemctl restart gunicorn
sudo systemctl restart nginx
`,
      explanation: `Restart the gunicorn and nginx`
    },
    {
      step: 24,
      command:  `sudo systemctl status gunicorn
sudo systemctl status nginx
      `,
      explanation: `Check the status of gunicorn and nginx`
    },
    {
      step: 25,
      command: `sudo journalctl -u gunicorn
sudo tail -f /var/log/nginx/error.log

`,
      explanation: `Log the error if needed`
    },
  ];

  return (
    <div>
      <div className="guide-container">
        <h1 className="welcome-text">🚀 Hosting Guide Follow These Steps🚀</h1>
        <h1 className="welcome-text">Completion: {complete}% ✅</h1>
        <button onClick={goBack} className="ctc-button">
          <span>GO Back</span>
        </button>
        <hr />

        <div className="dropdown-container">
          {commandData.map((item) => (
            <div key={item.step} className="dropdown-section" onClick={() => toggleStep(item.step)}>
              <input   className="checkbox"
                type="checkbox"
                checked={completedSteps.includes(item.step)} // Check if the step is completed
                onChange={(e) => {
                  e.stopPropagation();
                  toggleComplete(item.step); // Toggle completion
                }} />
              <h2 className="dropdown-heading">{`Step ${item.step}: ${
                item.step === 1 ? 'Update System Packages' :
                item.step === 2 ? 'Install Required Packages' :
                item.step === 3 ? 'Install PostgreSQL (Optional)' :
                item.step === 4 ? 'Create Virtual Environment and Activate it' :
                item.step === 5 ? 'Clone Your Project From Git Hub' :
                item.step === 6 ? 'Install the Project Dependencies' :
                item.step === 7 ? 'Configure Django Settings' :
                item.step === 8 ? 'PostgreSQL Setup' :
                item.step === 9 ? 'Create New DataBase' :
                item.step === 10 ? 'Make The Changes In The Settings' :
                item.step === 11 ? 'Collect Static Files' :
                item.step === 12 ? 'Migrate' :
                item.step === 13 ? 'Install Gunicorn' :
                item.step === 14 ? 'Test Gunicorn' :
                item.step === 15 ? 'Create a Gunicorn Service' :
                item.step === 16 ? 'Gunicorn configuration' :
                item.step === 17 ? 'Start Gunicorn' :
                item.step === 18 ? 'Configure Nginx' :
                item.step === 19 ? 'Nginx Configuration file' :
                item.step === 20 ? 'Enable the configuration' :
                item.step === 21 ? 'Check Status' :
                item.step === 22 ? 'Install SSL certificates' :
                item.step === 23 ? 'Restart Services (Gunicorn & Nginx)' :
                item.step === 24 ? 'Check Status (Gunicorn & Nginx)' :
                item.step === 25 ? 'Log the error if needed' :
                'Completed'
              } ▼`  }</h2>
              
              <div className="guide-steps" style={{ display: openStep === item.step ? 'block' : 'none' }}>
                <p className="commands">Command:</p>
                <div className="command-container">
                  <pre>{item.command}</pre>
                  <button 
                    className={`copy-button ${copiedStep === item.step ? 'copied' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      copyCommand(item.command, item.step);
                    }}
                  >
                    {copiedStep === item.step ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p className='exp'>Explanation: {item.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Guide;
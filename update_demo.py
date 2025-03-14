from fabric import Connection

server_ip = "your_ip"
user = "your_user"

def deploy():
    password = input("Enter the password for SSH: ")  # request password
    with Connection(
        host=f"{user}@{server_ip}", 
        connect_kwargs={"password": password}  # password transfer
    ) as c:
        c.run("cd /var/www/RED/ && git pull origin main")
        print("✅ pulling is completed! [*____]")

        c.run("source /var/www/RED/venv/bin/activate && cd /var/www/RED/ && pip install -r requirements.txt")
        print("✅ installing requirements is completed! [**___]")

        c.run("cd /var/www/RED/mikoshi && source /var/www/RED/venv/bin/activate && python manage.py migrate")
        print("✅ migrating is completed! [***__]")

        c.sudo("systemctl restart mikoshi", password=password)
        print("✅ restarting mikoshi.service is completed! [****_]")

        c.sudo("systemctl restart nginx", password=password)
        print("✅ Deployment is complete! [*****]")

deploy()
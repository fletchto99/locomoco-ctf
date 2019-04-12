Secure Employee Portal
---


### Detailed Solutions

1. **flag{sql-injection-is-dangerous}**
	1. When registering an account the user is asked for an employee access code
	1. They won't have to code so they will need to press the "forgot code" button.
	1. Since they won't have the recovery code they will need to figure out how to get one. This field is SQL injectable using `' or 1=1--`
	1. This will reveal the flag, which is also the code the students need to register an account.
1. **flag{open-redirects-no-good}**
	1. When logging in there's a query parameter "redirect" defaulting to go to the dashboard.
	1. Typically a redirect can be used like this to bring the user to a specific page (I.E. clicking a facebook link but you need to login first, it knows where to bring you back to)
	1. This is an open redirect and can be changed to anything which is dangerous because if the link is sent with the redirect parameter set to a phishing site the user's credentials can be stolen. Have the user demo an open redirect to something like google.com
	1. This can be done by going to `http://{host}:{ip}/login?redirect=http://google.com`
1. **flag{you-found-the-xss}**
	1. Notice that the dashboard page renders the user's first and last name, this hints that if the value were to be modified they could change what appears there.
	1. If the user changes their first or last name to something like `<script> alert("xss") </script>` the flag will be revealed.
1. **flag{sensitive-data-exposure-isnt-good}**
	1. When logged in view the page source a "developer comment" can be seen stating that there is a backup of the user's table in the file `backup.sql` found in the root directory.
	1. The flag is also in this comment. Its crucial that comments like this never make it to production as they can reveal information you don't want people to know. Furthermore a database backup shouldn't just be sitting there for people to access (yet this happens all the time leading to data breaches)
1. **flag{local-file-inclusion-found}**
	1. Based off of the information above we need to find the `backup.sql` file.
	1. A hint is given since each page is loaded separately as a query parameter, so to access the file all the user needs to do is try to access `backup.sql`
	1. Since the app states `/usr/app_root/pages/backup.sql` is the current directory they just need to go up a directory.
	1. The final solution is `../backup.sql`
1. **flag{you-own-all-the-passwords}**
	1. Based off of the data recovered in the `backup.sql` file we can see there is a fred account.
	1. The passwords are just MD5 hashes, and fred's password is simple to crack. A quick google search will reveal the password.
1. **flag{csrf-is-dangerous}** _(Optional & Quite difficult)_
	1. This one is quite challenging, it relies on a flaw in the update profile & the fact that the administrator account automatically manages incoming messages.
	1. At first it may look like an XSS is required to dump the admin's cookie however we check for that.
	1. Instead a CSRF is used to have the admin change his password to something you know and since we've got the admin username we're able to log into the profile to get the flag. The following code can be sent as a message to the administrator to change the password:

	```javascript
	<script>
    var http = new XMLHttpRequest();
    var url = "http://<app_host>:<app_port>/employee?page=profile.html";
    var params = "password=pass&confirm_password=pass";
    http.open("POST", url, true);
    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send(params);
	</script>
	```

### Recommended Solutions for Fixing the Issues

1. Use prepared statements
1. Only redirect to whitelisted sites
1. Use proper xss filitering (or a proper framework to prevent xss)
1. Ensure developer comments are removed before pushing to prod
1. Prevent loading files from anywhere
1. Use BCrypt
1. CSRF Token

## Development

The following section outlines the requirements to develop and deploy the challenge.

### Deploying for Production

These are the steps required to deploy the ctf in a production environment. It makes use of a few "hacks" around docker considering that not every computer its running on will be the same. Therefore we save the environment into the image rather than having the container load it during runtime. This is done by setting up the dockerfile with the environment. Furthermore we deploy the postgres DB and link the web container to it. However we wait for the db container to be live before making a connection, so if the DB fails to load the web container will just sit there silently. A better implementation could likely be done however there never seemed to be any issues using the [wait-for-it.sh](https://github.com/vishnubob/wait-for-it) script.

#### Saving the images

1. Clone this repo
1. Setup environment by modifying `challenge/database/Dockerfile` and `challenge/web/Dockerfile` ensuring the appropriate environment variables are setup.
1. Navigate to the `challenge` directory before running the following commands.
1. Run `docker-compose build && docker-compose up --no-start` to build the images
1. Run `docker save ctf_web ctf_db > ctf.tar` to export the images to a single file which can be provided to the students.
1. Provide `ctf.tar` and `challenge/prod/docker-compose.yml` to the participants (unless running online).

#### Running the containers

1. Copy `docker-compose.yml` and `ctf.tar` to the same directory.
1. Run `docker load < ctf.tar` which is provided by the TA.
1. Run `docker-compose up` from the directory containing `docker-compose.yml`
1. The app should now be accessible at [http://localhost:1337/](http://localhost:1337/)
	1. **NOTE** If the container is not on localhost you may need to run `docker machine ip` and use the ip provided there (it should still be running on port 1337 for example `http://192.168.99.100:1337/`)

When you're done the ctf you will need to kill the docker containers. This can be done using: `docker compose down`. **Note:** This will wipe the database. If you don't want to wipe the database you can use `docker stop ctf4_web ctf4_db`.

Finally when you're done with everything you can use `docker system prune -a` followed by `docker volume prune` to completely wipe the docker environment (note this will remove **EVERYTHING** you have in docker). Alternatively you can remove the images for the ctf manually.

### Modifying the app

The app was written in nodeJS. When modifying the app docker mounts a volume from the app's source directory to where the app is running in the container.

#### Running a development environment

1. Make sure you're working out of the `challenge` directory.
1. Run `docker-compose up` to create an instance of the app, any dependencies will be downloaded automatically during this step.
1. Any changes to the JS code are automatically reflected in the container and the app will be restarted right away.

#### Modifying the DB schema

1. If you've previously built the app you're going to need to rebuild the container `docker-compose build`
1. Now run `docker-compose up` and when the app runs the DB will be updated.

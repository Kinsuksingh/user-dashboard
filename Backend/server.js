import express, { json } from 'express'
import { open } from 'sqlite'
import sqlite3 from 'sqlite3'
import bcrypt from 'bcrypt'


const server = express();
server.use(express.json())


let db = null;
const databasePath = '../Backend/database.db'
const port = 3001;

const initializeDbAndServer = async () => {
    try {
        db = await open({
            filename: databasePath,
            driver: sqlite3.Database,
        });
        server.listen(port,   
            () => {
            console.log(`Server running at http://localhost:${port}/`);
        });
    } catch (error) {
        console.error(`Error connecting to database: ${error.message}`);
        process.exit(1);
    }
};

initializeDbAndServer()

const getTotalUsers = async () => {
    const count = await db.get("SELECT COUNT(*) AS count FROM users");
    return count;
};

const getTotalPosts = async () => {
    const count = await db.get("SELECT COUNT(*) AS count FROM posts");
    return count;
};



server.get('/api/home', async (req, res) => {
    try {
        // Logic to fetch data from database or other sources
        const totalUsers = await getTotalUsers();
        const totalPosts = await getTotalPosts();
        //  const activeUsersLast24Hours = await getUsersActiveInLast24Hours();
        // const postsPublishedLast24Hours = await getPostsPublishedInLast24Hours();

        const data = [
            {
                id :1,
                title:'Total Users',
                count : totalUsers.count
            },
            {
                id :2,
                title:'Total Posts',
                count : totalPosts.count
            },{
                id :3,
                title:'Total Active Users',
                count : totalUsers.count
            },
            {
                id :4,
                title:'Total Publish Posts',
                count : totalPosts.count
            },
        ];

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



server.get('/api/users', async (req, res) => {
    try {
        // Fetch all user data
        const users = await db.all('SELECT user_id as userId, username, name, email FROM users');
        res.send(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.send({ message: 'Internal server error'});
    }
});


server.get('/api/posts', async (req, res) => {
    try {
        // Fetch all user data
        const users = await db.all('SELECT post_id as postId, post_caption as postCaption, media_url as mediaUrl FROM posts');
        res.send(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.send({ message: 'Internal server error'});
    }
});




async function hashPassword(password) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}

async function comparePassword(password, hash) {
    const result = await bcrypt.compare(password, hash);
    return result;
}


server.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Query the user_info table for matching email
        const user = await db.get(`SELECT * FROM user_info WHERE email = '${email}';`);
        // Check if user exists
        if (!user) {
            const hashPass = await hashPassword(password)
            await db.run(`INSERT INTO user_info (email, password) VALUES ('${email}', '${hashPass}');`)
            return res.status(200).json({ message:"New User Created" });
        }else{
            const passwordMatch = await comparePassword(password,user.password)
            if(passwordMatch){
                return res.status(200).json({ message:"Login Success"});
            }else{
                return res.status(200).json({ message:"Invalid Password"});
            }
        }
    } catch (error) {
        return res.status(500).json({ message:error });
    }
});





export default server

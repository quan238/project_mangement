import * as redis from 'redis';

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});

const connectRedis = async () => {
  try {
    redisClient.connect();
    console.log(`⚡️[server]: Redis has been connected`);
    redisClient.set('try', 'pm_app');
  } catch (error) {
    console.log(error);
    setTimeout(connectRedis, 5000);
  }
};

// connectRedis();

export default redisClient;

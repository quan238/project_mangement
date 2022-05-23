import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

const connectRedis = async () => {
  try {
    // redis.connect();
    console.log(`⚡️[server]: Redis has been connected`);
    redis.set('try', 'pm_app');
  } catch (error) {
    console.log(error);
    setTimeout(connectRedis, 5000);
  }
};

connectRedis();

export default redis;

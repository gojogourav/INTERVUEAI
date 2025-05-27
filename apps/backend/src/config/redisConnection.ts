import { RateLimiterRedis } from "rate-limiter-flexible";
import rateLimit from "express-rate-limit";
import {createClient } from 'redis'

const redisClient =  createClient({url:"redis://localhost:6379"})
await redisClient.connect();

const signInRatelimiterOptions = {
  storeClient:redisClient,
  points:5,
  duration:30,
  blockDuration:30
}
const emailRatelimiterOptions = {
  storeClient:redisClient,
  points:5,
  duration:30,
  blockDuration:30
}
const aiRatelimiterOptions = {
  storeClient:redisClient,
  points:5,
  duration:30,
  blockDuration:30
}


const AuthrateLimiter = new RateLimiterRedis(signInRatelimiterOptions)
const EmailRateLimiter = new RateLimiterRedis(emailRatelimiterOptions)
const AiRateLimiter = new RateLimiterRedis(aiRatelimiterOptions)


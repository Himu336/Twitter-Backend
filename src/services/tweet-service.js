import { StatusCodes } from "http-status-codes";
import AppError from "../utils/errors/app-error.js";

import TweetRepository from "../repositories/tweet-repository.js";
import HashtagRepository from "../repositories/hashtag-repository.js";

const tweetRepository = new TweetRepository();
const hashtagRepository = new HashtagRepository();

async function createTweet(data) {
    try {
        const content = data.content;
        const tweet = await tweetRepository.create(data);
        const tags = (content.match(/#[a-zA-Z0-9_]+/g) || []).map(tag => tag.substring(1).toLowerCase());

        if (tags.length > 0) {
            const alreadyPresentTags = await hashtagRepository.getHashtagByName(tags);
            const textOfPresentTags = alreadyPresentTags.map(tag => tag.text);
            let newTags = tags.filter(tag => !textOfPresentTags.includes(tag));

            newTags = newTags.map(tag => {
                return {
                    text: tag,
                    tweets: [tweet.id]
                }
            });

            if (newTags.length > 0) {
                await hashtagRepository.bulkCreate(newTags);
            }

            alreadyPresentTags.forEach((tag) => {
                tag.tweets.push(tweet.id);
                tag.save();
            });
        }
        return tweet;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot create a new tweet object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getTweets() {
    try {
        const tweets = await tweetRepository.getAll();
        return tweets;
    } catch (error) {
        throw new AppError('Cannot fetch data of all tweets', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

async function getTweet(id) {
    try {
        const tweet = await tweetRepository.get(id);
        return tweet;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The tweet you requested is not present', error.statusCode);
        }
        throw new AppError('Cannot fetch data of the tweet', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

async function destroyTweet(id) {
    try {
        const tweet = await tweetRepository.destroy(id);
        return tweet;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The tweet you requested to delete is not present', error.statusCode);
        }
        throw new AppError('Cannot destroy the tweet', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export const TweetService = {
    create: createTweet,
    getAll: getTweets,
    get: getTweet,
    destroy: destroyTweet
};
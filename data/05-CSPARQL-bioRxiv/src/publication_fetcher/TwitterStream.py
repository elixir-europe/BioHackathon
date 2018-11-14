# coding: utf-8

'''
Listens to the twitter data stream
'''

import json
import re

import requests
from tweepy import Stream, OAuthHandler
from tweepy.streaming import StreamListener


class listener(StreamListener):
    '''
        Listener class for the twitter stream
    '''

    def on_data(self, data):
        json_data = json.loads(data)
        tweet_txt = json_data["text"]
        url = find_url(tweet_txt)
        if url:
            # print(url)
            first_url = url[0].split(' ')[0]
            if is_valid_url(first_url):
                print(first_url)
                # print(json_data)
        return (True)

    def on_error(self, status):
        print(status)


keys = json.loads(open('./twitter_credentials.json').read())


def find_url(string):
    '''
    Finds and returns the first url contained
    '''
    url = re.findall('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\), ]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', string)
    return url


def is_valid_url(url):
    '''
    Returns true if the url is valid
    '''
    try:
        request = requests.get(url)
        if request.status_code == 200:
            return True
        else:
            return False
    except:
        return False


auth = OAuthHandler(keys['ckey'], keys['csecret'])
auth.set_access_token(keys['atoken'], keys['asecret'])

auth = OAuthHandler(keys['ckey'], keys['csecret'])
auth.set_access_token(keys['atoken'], keys['asecret'])

twitterStream = Stream(auth, listener())
# twitterStream.filter(track=["publication", "paper"])
# 324784754: anilbey's id
# 2360241721: phy_papers
# 2820113721: ChIP_seq
twitterStream.filter(follow=["324784754", "2360241721", "2820113721"])


# coding: utf-8

# In[1]:


from tweepy import Stream
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener
import json


# In[2]:


keys = json.loads(open('./twitter_credentials.json').read())


# In[5]:


class listener(StreamListener):

    def on_data(self, data):
        json_data = json.loads(data)
        print(json_data)
        return(True)

    def on_error(self, status):
        print(status)


# In[6]:


auth = OAuthHandler(keys['ckey'], keys['csecret'])
auth.set_access_token(keys['atoken'], keys['asecret'])

twitterStream = Stream(auth, listener())
twitterStream.filter(track=["car"])
# 324784754: anilbey's id
#twitterStream.filter(follow=["324784754"])

import axios from "axios";
import Tweet from "./class/tweet";
import User from "./class/users";
let userCurrent = {};

const signUpBtn = document.getElementsByClassName('btn-enviar')
const postTweetBtn = document.getElementsByClassName('btn-enviar-tweets')

addListener(signUpBtn[0],'click',signUp)
addListener(postTweetBtn[0],'click',postTweet)

async function signUp() {
  console.log('entrei')
  const username = document.querySelector('#username').value;
  const picture = document.querySelector('#picture').value;
  const user = new User(username,picture)
  try {
    await axios.post('http://localhost:5000/sign-up', user)
    userCurrent = user;
    loadTweets();
  } catch (error) {
    console.error(error);
      alert('Erro ao fazer cadastro! Consulte os logs.');
  }
}

function addListener(element, events, handler ,options){
  if( ! (events instanceof Array)){
    element.addEventListener(events,handler,options)
    return
  }

  events.forEach((event)=>{
    element.addEventListener(event,handler,options)
  })
}

function loadTweets() {
  axios.get('http://localhost:5000/tweets').then(res => {
    const tweets = res.data;
    let tweetsHtml = '';

    for (const tweet of tweets) {
      tweetsHtml += `
        <div class="tweet">
          <div class="avatar">
            <img src="${tweet.avatar}" />
          </div>
          <div class="content">
            <div class="user">
              @${tweet.username}
            </div>
            <div class="body">
              ${escapeHtml(tweet.tweet)}
            </div>
          </div>
        </div>
      `;
    }

    document.querySelector('.tweets').innerHTML = tweetsHtml;
    document.querySelector('.pagina-inicial').classList.add('hidden');
    document.querySelector('.tweets-page').classList.remove('hidden');
  });
}

async function postTweet() {
  const text = document.querySelector('#tweet').value;
  const tweet = new Tweet(userCurrent.username,text)

  try {
    await axios.post('http://localhost:5000/tweets', tweet)
    document.querySelector('#tweet').value = '';
    loadTweets();
  } catch (error) {
    console.error(error);
      alert('Erro ao fazer tweet! Consulte os logs.');
  }
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

import User from "./users";

class Tweet extends User{
  constructor(username,tweet){
    super(username);
    this.tweet = tweet;
  }
}
export default Tweet
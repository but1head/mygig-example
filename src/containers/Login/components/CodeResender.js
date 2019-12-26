import React, { Component} from "react";
import ReCAPTCHA from "react-google-recaptcha";

const timeout = 5;

class CodeResender extends Component {

  state = {
    timeout,
    isShowModal: false,
  }

  timer = null;

  componentDidMount = () => {
    this.start();
  }

  start = () => {
    this.timer = setInterval(() => {
      let { timeout } = this.state;
      timeout -= 1;
      this.setState({ timeout });
      if(timeout === 0) this.stop();
    }, 1000);
  }

  stop = () => {
    clearInterval(this.timer);
  }

  onClickResend = () => {
    this.setState({ isShowCaptcha: true });
  }

  onSubmitCaptcha = () => {
    this.setState({
      isShowCaptcha: false,
      timeout,
    }, this.start);

    // api send new code
    alert('new sms sended');
  }


  render() {
    const { timeout, isShowCaptcha } = this.state;
    return (
      <div>
        {timeout > 0 && <div className="text-danger">Resend timeout {timeout} seconds</div>}
        {timeout === 0 && !isShowCaptcha && <a href="#" onClick={this.onClickResend}>Resend sms</a>}
        {isShowCaptcha && <><br /><ReCAPTCHA sitekey="6Ld3LMoUAAAAAPRh6LPU6065Qro90dDqsLC_-HUz" onChange={this.onSubmitCaptcha}/></>}
      </div>
    );
  }

}

export default CodeResender;

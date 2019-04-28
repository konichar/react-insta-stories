import React from 'react'
import PropTypes from 'prop-types'
import style from './../styles.css'

export default class Progress extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      duration: this.props.defaultInterval
    }
  }

  componentDidMount() {
    if (this.inner) {
      this.inner.addEventListener('webkitAnimationEnd', this.next, false)
      this.inner.addEventListener('animationend', this.next, false)
      this.inner.addEventListener('oanimationend', this.next, false)
    }
  }

  next = () => {
    this.props.next()
  }

  render() {
    let innerStyle
    switch (this.props.active) {
      case 2:
        innerStyle = { width: '100%' }
        break
      case 1:
        innerStyle = { animation: `${this.state.duration}ms linear 0ms ${style.slidein}`, animationPlayState: this.props.pause ? 'paused' : 'running' }
        break
      case 0:
        innerStyle = { width: 0 }
        break
      default:
        innerStyle = { width: 0 }
        break
    }
    return (
      <div className={style.autoHide} style={{ ...styles.progress, ...{ width: `${this.props.width * 100}%`, opacity: this.props.pause && !this.props.bufferAction ? 0 : 1 } }}>
        <div ref={r => { this.inner = r }} className={style.inner} style={innerStyle} />
      </div>
    )
  }
}

const styles = {
  progress: {
    height: 2,
    maxWidth: '100%',
    background: '#555',
    margin: 2
  }
}

Progress.propTypes = {
  width: PropTypes.number,
  defaultInterval: PropTypes.number,
  pause: PropTypes.bool,
  next: PropTypes.func,
  active: PropTypes.number,
  bufferAction: PropTypes.bool
}

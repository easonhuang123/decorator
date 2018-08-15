<template>
  <div id='app'>
    <div class='garden'>
      <div class='ball'></div>
    </div>
    <div>{{x}}</div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      x: 0
    }
  },
  mounted () {
    var ball = document.querySelector('.ball')
    var garden = document.querySelector('.garden')

    var maxX = garden.clientWidth - ball.clientWidth
    var maxY = garden.clientHeight - ball.clientHeight

    var _this = this
    function handleOrientation (event) {
      var y = event.beta  // In degree in the range [-180,180]
      var x = event.gamma // In degree in the range [-90,90]

      _this.x = x

      // Because we don't want to have the device upside down
      // We constrain the x value to the range [-90,90]
      if (y > 90) { y = 90 }
      if (y < -90) { y = -90 }

      // To make computation easier we shift the range of
      // x and y to [0,180]
      x += 90
      y += 90

      // 10 is half the size of the ball
      // It center the positioning point to the center of the ball
      ball.style.top = (maxY * 0.5 * y / 180) / 50 + 'rem'
      ball.style.left = (maxX * 0.5 * x / 180) / 50 + 'rem'

      console.log(ball.style.top, ball.style.left)
    }

    window.addEventListener('deviceorientation', handleOrientation)
  }
}
</script>

<style lang="less">
@rem: 1 / 50 * 1rem;

.garden {
  position: relative;
  width : 90%;
  height: 200*@rem;
  border: 5*@rem solid #CCC;
  border-radius: 10*@rem;
  margin: 0 auto;
}

.ball {
  position: absolute;
  top   : 90*@rem;
  left  : 90*@rem;
  width : 20*@rem;
  height: 20*@rem;
  background: green;
  border-radius: 100%;
}
</style>

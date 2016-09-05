// Import the code we need
import React from 'react';
import formatTime from 'minutes-seconds-milliseconds';

import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

// Create a react component
var StopWatch = React.createClass({
    getInitialState: function() {
        return {
            timeElapsed: null,
            running: false,
            startTime: null,
            laps: []
        }
    },
    render: function() {
        return <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.timerWrapper}>
                    <Text style={styles.timer}>
                        {formatTime(this.state.timeElapsed)}
                    </Text>
                </View>
                <View style={styles.buttonWrapper}>
                    {this.startStopButton()}
                    {this.lapButton()}
                </View>
            </View>

            <View style={styles.footer}>
                {this.laps()}
            </View>
        </View>
    },
    laps: function() {
        return this.state.laps.map(function(time, index) {
            return <View style={styles.lap} key={index}>
                <Text style={styles.lapText}>
                    Lap #{index + 1}
                </Text>
                <Text style={styles.lapText}>
                    {formatTime(time)}
                </Text>
            </View>
        });
    },
    startStopButton: function() {
        var style = this.state.running ? styles.stopButton : styles.startButton;
        return <TouchableHighlight style={[styles.button, style]} underlayColor='gray' onPress={this.handleStartPress}>
            <Text>
                {this.state.running ? 'Stop' : 'Start'}
            </Text>
        </TouchableHighlight>
    },
    lapButton: function() {
        return <TouchableHighlight style={styles.button} underlayColor='gray' onPress={this.handleLapPress}>
            <Text>
                <Text>Lap</Text>
            </Text>
        </TouchableHighlight>
    },
    handleStartPress: function() {
        if (this.state.running) {
            var lap = this.state.timeElapsed;
            clearInterval(this.interval);
            this.setState({
                running: false,
                laps: this.state.laps.concat([lap])
            });
            return
        }

        this.setState({
            startTime: new Date(),
            running: true,
            laps: []
        });
        this.interval = setInterval( () => {
            this.setState({
                timeElapsed: new Date() - this.state.startTime
            });
        }, 10);
    },
    handleLapPress: function() {
        var lap = this.state.timeElapsed;
        this.setState({
            startTime: new Date(),
            laps: this.state.laps.concat([lap])
        });
    }
});

// Style the react component
var styles = StyleSheet.create({
    container: {
        flex: 1, // Fill the entire screen
        alignItems: 'stretch'
    },
    header: {
        flex: 1
    },
    footer: {
        flex: 1,
    },
    timerWrapper: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonWrapper: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    timer: {
        fontSize: 60
    },
    button: {
        borderWidth: 2,
        width: 90,
        height: 90,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    startButton: {
        borderColor: '#00cc00'
    },
    stopButton: {
        borderColor: '#cc0000'
    },
    lap: {
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    lapText: {
        fontSize: 30
    }
});

// Show the react component on the screen
AppRegistry.registerComponent('stopwatch', () => StopWatch);

radio.setGroup(34)
radio.setTransmitPower(7)
let transmit_temp = false
basic.forever(function on_forever() {
    let t: number;
    
    if (transmit_temp) {
        t = 0
        for (let i = 0; i < 10; i++) {
            t += input.temperature()
            basic.pause(1000)
        }
        led.toggle(2, 2)
        radio.sendValue("temp", Math.roundWithPrecision(t / 10, 2))
        basic.pause(500)
        led.toggle(2, 2)
    }
    
})
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    transmit_temp = !transmit_temp
    if (transmit_temp) {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.showIcon(IconNames.No)
    }
    
    basic.clearScreen()
})
radio.onReceivedValue(function on_received_value(name: string, value: number) {
    serial.writeValue(name, value)
})

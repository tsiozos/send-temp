radio.set_group(34)
radio.set_transmit_power(7)
transmit_temp = False

def on_forever():
    global transmit_temp
    if transmit_temp:
        t=0
        for i in range(10):
            t+=input.temperature()
            basic.pause(1000)
        led.toggle(2, 2)
        radio.send_value(str(control.device_serial_number())+".temp", t/10)
        basic.pause(500)
        led.toggle(2, 2)

basic.forever(on_forever)

def on_button_pressed_a():
    global transmit_temp
    transmit_temp = not transmit_temp
    if transmit_temp:
        basic.show_icon(IconNames.YES)
    else:
        basic.show_icon(IconNames.NO)
    basic.clear_screen()

input.on_button_pressed(Button.A, on_button_pressed_a)

def on_received_value(name, value):
    serial.write_value(name, value)

radio.on_received_value(on_received_value)
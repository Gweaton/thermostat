'use strict';

describe('Thermostat', function() {

  var thermostat;

  beforeEach(function(){
    thermostat = new Thermostat();
  });

  it('it starts on 20 degrees', function() {
    expect(thermostat.degrees).toBe(20);
  });

  it('has a reset function', function() {
    thermostat.reset();
    expect(thermostat.degrees).toBe(20);
  });

  it ('starts with power saving on', function() {
    expect(thermostat.powerSaving).toBeTruthy();
  });

  it ('can turn power saving off', function() {
    thermostat.setPowerSaving(false);
    expect(thermostat.powerSaving).toBeFalsy();
  });

  describe('changing temperatures', function() {

    it('can increase temperature', function() {
      thermostat.increase();
      expect(thermostat.degrees).toBe(21);
    });

    it('can decrease temperature', function() {
      thermostat.decrease();
      expect(thermostat.degrees).toBe(19);
    });

    it('cannot be increased over 25 when power saving is on', function(){
      expect(function() {
        for (var i = 0; i < 6; i++) {
          thermostat.increase();
        }
      }).toThrowError("Power saving on. Maximum temperature reached.");
    });

    it('cannot be increased over 32 when power saving is off', function(){
      expect(function() {
        thermostat.powerSaving = false;
        for (var i = 0; i < 13; i++) {
          thermostat.increase();
        }
      }).toThrowError("Power saving off. Maximum temperature reached.");
    });

    it('cannot be decreased below the minimum temperature', function() {
      expect(function() {
        for (var i = 0; i < 11; i++) {
          thermostat.decrease();
        }
      }).toThrowError("Temperature cannot be decreased any further.");
    });
  });
});

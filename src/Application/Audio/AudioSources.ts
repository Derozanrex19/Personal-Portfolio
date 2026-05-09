import AudioManager from './AudioManager';
import * as THREE from 'three';
import UIEventBus from '../UI/EventBus';
import { Vector3 } from 'three';

export class AudioSource {
    manager: AudioManager;

    constructor(manager: AudioManager) {
        this.manager = manager;
    }

    update() {}
}
export class ComputerAudio extends AudioSource {
    lastKey: string;

    constructor(manager: AudioManager) {
        super(manager);

        document.addEventListener('keyup', (event) => {
            // @ts-ignore
            if (event.inComputer) {
                this.lastKey = '';
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key.includes('_AUTO_')) {
                this.manager.playAudio('ccType', {
                    volume: 0.1,
                    randDetuneScale: 0,
                    pitch: 20,
                });
                return;
            }
            if (this.lastKey === event.key) return;
            this.lastKey = event.key;

            // @ts-ignore
            if (event.inComputer) {
                this.manager.playAudio('keyboardKeydown', {
                    volume: 0.8,
                    position: new THREE.Vector3(-300, -400, 1200),
                });
            }
        });
    }
}

export class AmbienceAudio extends AudioSource {
    poolKey: string;

    constructor(manager: AudioManager) {
        super(manager);
        UIEventBus.on('loadingScreenDone', () => {
            this.poolKey = this.manager.playAudio('office', {
                volume: 0.22,
                loop: true,
                randDetuneScale: 0,
            });
        });
    }

    mapValues(
        input: number,
        input_start: number,
        input_end: number,
        output_start: number,
        output_end: number
    ) {
        return (
            output_start +
            ((output_end - output_start) / (input_end - input_start)) *
                (input - input_start)
        );
    }

    update() {
        if (!this.poolKey) return;
    }
}

import * as THREE from 'three';
import Application from '../Application';
import Camera, { CameraKey } from '../Camera/Camera';
import Sizes from '../Utils/Sizes';
import UIEventBus from '../UI/EventBus';
import Decor from './Decor';

const RESUME_URL = '/documents/Resume_Updated%20(1).pdf';

export default class ResumePaper {
    application: Application;
    camera: Camera;
    sizes: Sizes;
    raycaster: THREE.Raycaster;
    decor: Decor;
    sourcePaper: THREE.Mesh | undefined;
    isOpen: boolean;

    constructor(decor: Decor) {
        this.application = new Application();
        this.camera = this.application.camera;
        this.sizes = this.application.sizes;
        this.raycaster = new THREE.Raycaster();
        this.decor = decor;
        this.sourcePaper = this.decor.paperMesh;
        this.isOpen = false;

        this.bindEvents();
    }

    bindEvents() {
        window.addEventListener('mousedown', this.handleMouseDown, true);
        UIEventBus.on('resumeCloseRequest', () => {
            this.closeResume();
        });
    }

    handleMouseDown = (event: MouseEvent) => {
        if (!this.isDeskActive() || this.isOpen) return;
        if (!(this.sourcePaper instanceof THREE.Mesh)) return;

        const intersection = this.intersectPaper(event.clientX, event.clientY);
        if (!intersection) return;

        event.preventDefault();
        event.stopPropagation();
        this.openResume();
    };

    intersectPaper(clientX: number, clientY: number) {
        if (!(this.sourcePaper instanceof THREE.Mesh)) return null;

        const pointer = new THREE.Vector2(
            (clientX / this.sizes.width) * 2 - 1,
            -(clientY / this.sizes.height) * 2 + 1
        );

        this.raycaster.setFromCamera(pointer, this.camera.instance);
        const intersections = this.raycaster.intersectObject(this.sourcePaper);

        return intersections[0] || null;
    }

    isDeskActive() {
        return (
            this.camera.currentKeyframe === CameraKey.DESK ||
            this.camera.targetKeyframe === CameraKey.DESK
        );
    }

    openResume() {
        this.isOpen = true;
        UIEventBus.dispatch('resumeOpen', { url: RESUME_URL });
    }

    closeResume() {
        this.isOpen = false;
        UIEventBus.dispatch('resumeClose', {});
    }
}

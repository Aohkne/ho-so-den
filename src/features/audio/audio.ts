/**
 * Âm thanh bằng Web Audio thuần — không thư viện ngoài, mọi tiếng đều tổng hợp tại chỗ.
 */
export class ArchiveAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private droneStarted = false;
  private enabled = false;

  private ensureContext() {
    if (!this.ctx) {
      this.ctx = new AudioContext();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0;
      this.master.connect(this.ctx.destination);
    }
    return this.ctx;
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    const ctx = this.ensureContext();
    if (ctx.state === "suspended") ctx.resume();

    if (enabled) {
      this.master!.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.6);
      if (!this.droneStarted) {
        this.startDrone(ctx, this.master!);
        this.droneStarted = true;
      }
    } else {
      this.master!.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
    }
  }

  isEnabled() {
    return this.enabled;
  }

  /** Tiếng nhấp nhẹ: mở hồ sơ, lật trang. */
  blip() {
    this.tone({ type: "sine", from: 520, to: 340, duration: 0.18, gain: 0.25 });
  }

  /** Tiếng thu được chứng cứ: hai nốt đi lên. */
  found() {
    this.tone({ type: "triangle", from: 440, to: 660, duration: 0.14, gain: 0.22 });
    window.setTimeout(() => this.tone({ type: "triangle", from: 660, to: 880, duration: 0.16, gain: 0.18 }), 110);
  }

  /** Tiếng đóng dấu: một cú "thịch" trầm. */
  stamp() {
    this.tone({ type: "square", from: 180, to: 60, duration: 0.22, gain: 0.3 });
  }

  /** Tiếng kết luận sai: nốt trầm kéo dài. */
  wrong() {
    this.tone({ type: "sawtooth", from: 220, to: 110, duration: 0.5, gain: 0.16 });
  }

  /** Tiếng tách công tắc đèn: một cú click cơ khí rất ngắn. */
  switchClick() {
    this.tone({ type: "square", from: 950, to: 650, duration: 0.035, gain: 0.16 });
  }

  private tone(opts: { type: OscillatorType; from: number; to: number; duration: number; gain: number }) {
    if (!this.enabled || !this.ctx || !this.master) return;
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = opts.type;
    osc.frequency.setValueAtTime(opts.from, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(opts.to, ctx.currentTime + opts.duration);
    gain.gain.setValueAtTime(opts.gain, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + opts.duration);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start();
    osc.stop(ctx.currentTime + opts.duration + 0.02);
  }

  private startDrone(ctx: AudioContext, destination: GainNode) {
    const oscA = ctx.createOscillator();
    const oscB = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 900;

    oscA.type = "triangle";
    oscA.frequency.value = 84;
    oscB.type = "sine";
    oscB.frequency.value = 126;

    oscA.connect(filter);
    oscB.connect(filter);
    filter.connect(destination);
    oscA.start();
    oscB.start();
  }
}

import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { COLORS } from "../libs/colors";

const PipesAnimation = ({
  numLines = 2, // Número de linhas
  lineSpeed = 3, // Velocidade das linhas
  turnProbability = 0.02, // Probabilidade de mudança de direção
  smoothTrails = false, // Deixar rastro "smooth" ou removê-lo após X tempo
  trailLength = 200, // Comprimento do rastro
  clearAfter = null, // Tempo para apagar o rastro; se null, não apaga
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Define a largura e a altura do canvas para cobrir toda a tela.
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Pipe {
      constructor(startImmediately = false) {
        this.reset();
        if (!startImmediately) {
          this.active = false; // Inicializa alguns pipes como inativos
        }
      }

      reset() {
        // Posição inicial aleatória no canvas
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        // Ângulo inicial em múltiplos de 90 graus (para que as linhas sigam um padrão reto)
        this.angle = Math.floor(Math.random() * 4) * (Math.PI / 2);

        // Cor aleatória selecionada da lista de cores
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];

        // Velocidade definida via prop
        this.speed = lineSpeed;

        // Probabilidade de mudança de direção definida via prop
        this.turnChance = turnProbability;

        this.active = true; // Ativa o pipe
        this.trail = []; // Inicializa o rastro do pipe como vazio
        this.maxTrailLength = trailLength; // Comprimento máximo do rastro definido via prop
      }

      update() {
        if (!this.active) return;

        // Mudança de direção em múltiplos de 90 graus
        if (Math.random() < this.turnChance) {
          const turnDirection = Math.random() < 0.5 ? -1 : 1;
          this.angle += turnDirection * (Math.PI / 2);
        }

        // Movimento na direção atual
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // Volta ao início da tela quando sai dos limites (efeito de wraparound)
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Atualiza o rastro com a nova posição
        this.trail.unshift({ x: this.x, y: this.y });
        if (this.trail.length > this.maxTrailLength) {
          this.trail.pop(); // Remove os pontos mais antigos do rastro
        }
      }

      draw() {
        if (!this.active) return;

        // Desenha o rastro da linha
        ctx.strokeStyle = this.color; // Define a cor da linha
        ctx.lineWidth = 3; // Largura da linha
        ctx.beginPath();
        ctx.moveTo(this.trail[0].x, this.trail[0].y);

        for (let i = 1; i < this.trail.length; i++) {
          ctx.lineTo(this.trail[i].x, this.trail[i].y);
          if (smoothTrails) {
            // Ajusta a opacidade para criar um efeito de desvanecimento no rastro
            ctx.globalAlpha = 1 - i / this.trail.length;
          }
        }

        ctx.stroke();
        ctx.globalAlpha = 1; // Restaura a opacidade para o padrão
      }
    }

    // Define quantos pipes serão criados conforme a prop numLines
    const pipes = Array(numLines)
      .fill()
      .map((_, i) => new Pipe(i < 2));
    let activeCount = 2; // Número inicial de pipes ativos

    const animate = () => {
      if (clearAfter !== null) {
        // Limpa o canvas após o tempo definido em clearAfter
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        // Preenche o canvas com um fundo semitransparente para criar um efeito de desvanecimento
        ctx.fillStyle = smoothTrails ? "rgba(0, 43, 54, 0.05)" : "#002B36";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      pipes.forEach((pipe, index) => {
        pipe.update(); // Atualiza a posição e o estado do pipe
        pipe.draw(); // Desenha o pipe no canvas

        // Ativa novos pipes gradualmente com base em uma chance aleatória
        if (
          index === activeCount - 1 &&
          Math.random() < 0.01 &&
          activeCount < pipes.length
        ) {
          pipes[activeCount].active = true;
          activeCount++;
        }
      });

      // Continua a animação chamando o próximo quadro
      animationFrameId = requestAnimationFrame(animate);
    };

    animate(); // Inicia a animação

    return () => {
      // Cancela a animação ao desmontar o componente
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    numLines,
    lineSpeed,
    turnProbability,
    smoothTrails,
    trailLength,
    clearAfter,
  ]);

  return (
    // Canvas em tela cheia com fundo #002B36
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", backgroundColor: "#002B36" }}
    />
  );
};

PipesAnimation.propTypes = {
  numLines: PropTypes.number,
  lineSpeed: PropTypes.number,
  turnProbability: PropTypes.number,
  smoothTrails: PropTypes.bool,
  trailLength: PropTypes.number,
  clearAfter: PropTypes.number,
};

export default PipesAnimation;

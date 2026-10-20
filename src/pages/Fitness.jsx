import banner from '../assets/imgs/Fondo-Fitness.jpg'
import spinning from '../assets/imgs/fitness_spinning.jpg'
import core from '../assets/imgs/fitness_core.jpg'
import bands from '../assets/imgs/fitness_bandas.jpg'
import weights from '../assets/imgs/fitness_pesas.jpg'
import pilates from '../assets/imgs/fitness_pilates.jpg'
import ServiceLayout, { ServiceCopy, ServiceRow } from '../components/ServiceLayout'

export default function Fitness() {
  return (
    <ServiceLayout title="Fitness" banner={banner} bannerAlt="Entrenamiento físico en Brazada" className="fitness-page">
      <ServiceRow image={spinning} alt="Bicicletas estáticas para las clases de spinning">
        <ServiceCopy title="Spinning" className="fitness-spinning">
          <p>El ciclismo estático es un entrenamiento de bajo impacto para personas de cualquier edad y condición física. Mejora las capacidades aeróbicas, fortalece los músculos y contribuye a la pérdida de peso.</p>
        </ServiceCopy>
        <ServiceCopy title="Circuito" className="fitness-circuit">
          <p>La resistencia aeróbica mejora considerablemente con esta modalidad dinámica y variada de entrenamiento, que se basa en la repetición sincronizada de series de ejercicios. Los músculos se definen sin aumentar su masa, al tiempo que disminuye el tejido graso.</p>
        </ServiceCopy>
      </ServiceRow>
      <ServiceRow image={core} imageRight alt="Ejercicios de core y tono muscular">
        <ServiceCopy title="Core" className="fitness-core">
          <p>Los ejercicios de core enfatizan en el fortalecimiento de la zona media del cuerpo. Con ellos se mejora la flexibilidad de los movimientos del tronco, se aumenta el equilibrio y la coordinación y se incrementa la firmeza postural, entre otros beneficios.</p>
        </ServiceCopy>
        <ServiceCopy title="Tono" className="fitness-tone">
          <p>La práctica regular de los ejercicios de tono mejora la flexibilidad y fuerza de los músculos y aumenta su rigidez para soportar cargas, bases para conseguir una buena postura. Adicionalmente ayuda en la metabolización de grasas y calorías.</p>
        </ServiceCopy>
      </ServiceRow>
      <ServiceRow image={bands} alt="Entrenamiento con bandas y resortes">
        <ServiceCopy title="TRX" className="fitness-trx">
          <p>Las prácticas de TRX combinan el trabajo cardiovascular con el muscular. Sus resultados se muestran en la reducción de los niveles de grasa, la tonificación de los grupos musculares y una mejor condición física.</p>
        </ServiceCopy>
        <ServiceCopy title="Resortes" className="fitness-springs">
          <p>Músculos y huesos se benefician con la práctica de resortes. Además de sus bondades fisioterapéuticas, estos ejercicios tonifican y definen los músculos. Según la orientación del trabajo, se puede optar por aumentar o no la masa muscular.</p>
        </ServiceCopy>
      </ServiceRow>
      <ServiceRow image={weights} imageRight alt="Máquinas y pesas del gimnasio de Brazada">
        <ServiceCopy title="Cardio – Pesas" className="fitness-cardio">
          <p>Los ejercicios cardiovasculares aumentan nuestro ritmo cardiorrespiratorio, así que quemamos más calorías rápidamente al tiempo que mejoramos nuestro metabolismo y se fortalece nuestro corazón y pulmones. Además disminuye el nivel de hormonas del estrés, gracias a que liberamos endorfinas.</p>
          <p>El objetivo principal de levantar pesas es el de fortalecer los músculos, aumentar su tamaño, potencia y aguante.</p>
        </ServiceCopy>
      </ServiceRow>
      <ServiceRow image={pilates} alt="Práctica de Pilates en Brazada">
        <ServiceCopy title="Pilates">
          <p>Un cuerpo elástico y armonioso, con músculos fuertes y definidos, es la promesa de la práctica de Pilates. Pero además este sistema de ejercicio, basado en la respiración y la coordinación de movimientos precisos, relaja la mente y disminuye el estrés.</p>
        </ServiceCopy>
      </ServiceRow>
    </ServiceLayout>
  )
}

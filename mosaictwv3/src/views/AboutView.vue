<template>
  <div class="max-w-screen-md mx-auto my-6 px-4 md:px-0 text-left flex flex-col gap-3">
  <h2 class="text-xl font-bold text-red-600">Sobre el Mosaic</h2>
    <p>El Mosaic Casteller comença com a un experiment visual, com una manera de visualitzar el món casteller d'una sola mirada.<br>
      En ell es recullen les dades de totes Colles Castelleres del present, del passat, de Catalunya i de fora de l’àmbit Cultural Català. </p>
      <p>Cada colla està representada per una tessel·la del color de la seva camisa. <br>
        La camisa d’un casteller el seu principal símbol d’identitat, els integrants d’una colla se senten units amb els seus companys a través del color que vesteixen.</p>
     <p> El Mosaic agrupa totes aquestes identitats en una obra que representa la totalitat del panorama i la historia del món casteller, utilitzant diferents visualitzacions amb les que l’usuari pot interactuar, jugar i aprendre sobre les colles.
     </p>
  <h3  class="text-lg font-bold text-red-600">Investigació</h3>
    <p>Aquest projecte inclou més de 170 colles, aquelles autòctones de municipis dels països catalans, les potents colles universitàries, i les que s’han establert fora de la nació d’origen dels castells. <br>
      Apareixen també colles històriques, aquelles que durant la historia castellera han desaparegut, s’han reformat en colles noves, o han patit escissions.</p>
    <p>La llista de colles incloses te varies fonts. Principalment, la llista de membres en ple dret de la 
      <a class="text-red-600 hover:text-red-400 underline" href="https://castellscat.cat/ca/les-colles-llistat" target="blank">Coordinadora de les Colles Castelleres de Catalunya</a>
       i la <a class="text-red-600 hover:text-red-400  underline" href="https://castellscat.cat/ca/base-de-dades" target="blank">Base de Dades </a>d'aquesta, 
       en la que apareixen també les no-mebres i les històriques.<br>
       També s'han referenciat projectes de catalogació similars com <a class="text-red-600 hover:text-red-400  underline" href="https://castell.manies.cat" target="blank">castell.manies.cat</a>, 
    el <a class="text-red-600 hover:text-red-400  underline" href="https://sigac.cat" target="blank">SiGAC</a>, 
    <a class="text-red-600 hover:text-red-400  underline" href="https://portalcasteller.cat" target="blank">Portal Casteller</a> o l'article
    <a class="text-red-600 hover:text-red-400  underline" href="https://ca.wikipedia.org/wiki/Llista_de_colles_castelleres" target="_blank" rel="noopener noreferrer">Llista de Colles Castelleres</a> de Viquipèdia.
    </p>
    <p>Algunes d’aquestes colles posseeixen molt poca documentació, i la seva antiguitat o succinta vigència fa que completar-ne el perfil sigui tot un treball 
      arqueològic. </p>
    <p>
      Al peu de la pàgina d’inici apareixen les colles de les que encara no es te una referencia prou precisa del color. Aquests requadres provisionals demanen 
      a crits ser pintats amb la identitat que els pertoca, convertint el Mosaic en un emocionant puzle a completar, per poder observar la totalitat del mon 
      casteller en colors. </p>
    <p>
      Aquest és un repte que vull plantejar a tot el món casteller, per tant animo a consultar la llista d’informació extraviada, i si tens qualsevol dada, per mínima que sigui, que contribuir al Mosaic, a fer-la arribar a 
      <a class="text-red-600 hover:text-red-400 underline" href="mailto:eudald.ca.va@gmail.com" target="blank">eudald.ca.va.@gmail.com</a>.
    </p>
    
  <h3  class="text-lg font-bold text-red-600 mt-2">Investigació</h3>
    <p>
      L’origen del codi de color de la majoria de colles és del seu article de Viquipèdia, cosa que fa que la seva fiabilitat es pugui posar en dubte. D’altres estan extrets de llocs web o publicacions oficials.  </p>
    <p>
      Un altre dels objectius del Mosaic Casteller és augmentar la estandardització de les identitats castelleres, i servir com a punt de referencia on trobar dades 
      precises sobre el color de cada una. A la web de la <a class="text-red-600 hover:text-red-400 underline" href="https://castellscat.cat/ca/les-colles-llistat" target="blank">CCCC</a>, hi ha colles, com és l’exemple de <SpanColla colla="bordegassos_de_vilanova" text="Bordegassos" />, que tenen estipulat un codi Pantone precís del seu color 
      Groc Terrós, la gran majoria, però, nomes presenten un nom genèric com “Blau”.</p>
      <p>Altres fonts, com el <a class="text-red-600 hover:text-red-400  underline" href="https://barometreestrella.blogspot.com" target="blank">Baròmetre</a>
      o <a class="text-red-600 hover:text-red-400  underline" href="https://portalcasteller.cat" target="blank">Portal Casteller</a>, fan servir colors genèrics que no mostren de manera precisa el color identificatiu de cada colla.</p>
      <p>Per un símbol tant essencial per les colles com es la seva camisa, sovint l'ús d'aquest color en xarxes, cartells o inclòs en les pròpies camises, és inconsistent.</p>

    <h3  class="text-lg font-bold text-red-600 mt-2">Eudald Cardozo i Vallhonrat</h3>
      <p>Soc estudiant de Disseny Digital i Tecnologies Creatives a la Universitat de Lleida.<br>
        Tot i ser de sang <SpanColla colla="minyons_de_terrassa" text="minyona"/>, el meu interès profund pel món casteller no va arribar fins que vaig apuntar-me a <SpanColla colla="los_marracos_de_la_udl"/> a l’entrar a la Universitat. 
        Combinant aquesta afició amb la meva línia de treball, ganes d’augmentar habilitats i compartir les meves idees amb el món, estic desenvolupant aquesta pàgina, que va començar com a un simple treball de classe.</p>
    <p>Mica en mica vaig construint un portal actualitzat i modern on trobar tota la informació sobre colles castelleres. <br>
      L’abast real del projecte encara està per definir, però penso que la Viquipèdia ja se’ns queda petita per a un món casteller en expansió.</p>
  </div>
</template>

<script>
import SpanColla from '@/components/SpanColla.vue';

export default({
  components:{
    SpanColla
  }
})

</script>
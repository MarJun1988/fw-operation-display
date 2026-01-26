<template>
  <div class="grid mt-2 pt-2">
    <template v-for="(field, index) in fields">
      <!-- Einfaches Textfeld -->
      <div v-if="field.fieldType === 'inputText'" :class="field.cssClass" class="font-bold">
          <span class="p-float-label">
            <InputText :id="index" v-model="item[index]"
                       :aria-describedby="index+'-help'" :autofocus="field.autofocus"
                       :disabled="disabledAllFields || field.disabled"
                       :maxlength="field.maxlength"
                       :minlength="field.minlength"
                       :readonly="readOnlyAllFields || field.readonly"
                       :required="field.required" class="min-w-full"/>
            <label :for="index"><required-star v-if="field.required"/>{{ field.label }}</label>
          </span>
        <div class="flex justify-content-between flex-wrap m-2">
          <small v-if="item[index]" class="fadeinleft animation-duration-200 font-light font-italic">
            {{ generals.numberOfCharacters }} {{
              item[index].length
            }}/{{ field.maxlength }}</small>
          <small :id="index+'-help'">{{ field.help }}</small>
        </div>
      </div>
      <!-- Einfache Textarena -->
      <div v-if="field.fieldType === 'textarea'" :class="field.cssClass" class="font-bold">
          <span class="p-float-label">
            <Textarea :id="index" v-model="item[index]"
                      :aria-describedby="index+'-help'" :autofocus="field.autofocus"
                      :disabled="disabledAllFields || field.disabled"
                      :maxlength="field.maxlength"
                      :minlength="field.minlength"
                      :readonly="readOnlyAllFields || field.readonly"
                      :required="field.required"
                      class="min-w-full" rows="5"/>
            <label :for="index"><required-star v-if="field.required"/>{{ field.label }}</label>
          </span>
        <div class="flex justify-content-between flex-wrap m-2">
          <small v-if="item[index]" class="fadeinleft animation-duration-200 font-light font-italic">
            {{ generals.numberOfCharacters }} {{
              item[index].length
            }}/{{ field.maxlength }}</small>
          <small :id="index+'-help'">{{ field.help }}</small>
        </div>
      </div>
      <!-- Zahlen Eingabe -->
      <div v-if="field.fieldType === 'inputNumber'" :class="field.cssClass" class="font-bold">
          <span class="p-float-label">
            <InputNumber :id="index" v-model="item[index]"
                         :aria-describedby="index+'-help'"
                         :autofocus="field.autofocus"
                         :disabled="disabledAllFields || field.disabled" :maxlength="field.maxlength"
                         :minlength="field.minlength"
                         :readonly="readOnlyAllFields || field.readonly"
                         :required="field.required" :step="field.step"
                         class="min-w-full" showButtons/>
            <label :for="index"><required-star v-if="field.required"/>{{ field.label }}</label>
          </span>
        <div class="flex justify-content-between flex-wrap m-2">
          <small v-if="item[index]" class="fadeinleft animation-duration-200 font-light font-italic">
            {{ generals.numberOfCharacters }} {{
              item[index].length
            }}/{{ field.maxlength }}</small>
          <small :id="index+'-help'">{{ field.help }}</small>
        </div>
      </div>
      <!-- Dropdown -->
      <div v-if="field.fieldType === 'dropDown'" :class="field.cssClass" class="font-bold">
          <span class="p-float-label">
            <!-- Reagieren bei Änderung -->
            <Dropdown v-if="field.change" :id="index"
                      v-model="item[index].id"
                      :aria-describedby="index+'-help'"
                      :autofocus="field.autofocus" :disabled="disabledAllFields || field.disabled"
                      :loading="field.isLoading"
                      :options="field.options"
                      :readonly="readOnlyAllFields || field.readonly" :required="field.required"
                      class="min-w-full" filter option-label="label" option-value="value"
                      @change="emit(`${field.change}`, $event)"/>
            <Dropdown v-else :id="index"
                      v-model="item[index].id"
                      :aria-describedby="index+'-help'"
                      :autofocus="field.autofocus" :disabled="disabledAllFields || field.disabled"
                      :loading="field.isLoading"
                      :options="field.options"
                      :readonly="readOnlyAllFields || field.readonly" :required="field.required"
                      class="min-w-full" filter option-label="label" option-value="value"/>
            <label :for="index"><required-star v-if="field.required"/>{{ field.label }}</label>
          </span>
        <div class="flex justify-content-between flex-wrap m-2">
          <small></small>
          <small :id="index+'-help'">{{ field.help }}</small>
        </div>
      </div>
      <!-- Input Switch -->
      <div v-if="field.fieldType === 'inputSwitch'" :class="field.cssClass" class="font-bold">
          <span class="p-float-label">
            <label :for="index"><required-star v-if="field.required"/>{{ field.label }}</label>
            <InputSwitch :id="index"
                         v-model="item[index]"
                         :aria-describedby="index+'-help'"
                         :autofocus="field.autofocus" :disabled="disabledAllFields || field.disabled"
                         :readonly="readOnlyAllFields || field.readonly" :required="field.required"
                         class="block m-auto"
            />
          </span>
        <div class="flex justify-content-between flex-wrap m-2">
          <small></small>
          <small :id="index+'-help'">{{ field.help }}</small>
        </div>
      </div>
    </template>

    <!-- Text Erforderliches Felder -->
    <div v-if="showRequiredText" class="col-12">
      <required-text/>
    </div>
  </div>
</template>

<script setup>
import RequiredText from "@/components/RequiredText.vue";
import RequiredStar from "@/components/RequiredStar.vue";
import {onMounted, ref, watch} from "vue";
import {useTranslationStore} from "@/stores/translate";
import {storeToRefs} from "pinia";

// Events die abgefeuert werden
const emit = defineEmits(['enabledActionButton', 'changeDropDownFederalState', 'changeDropDownDepartment'])

// Variable die auf mit von der Component erwartet werden
const props = defineProps({
  // Felder
  fields: {
    type: Object,
    required: true
  },
  // Eintrag
  item: {
    type: Object,
    required: true
  },
  // Anzeige - erforderliche Felder
  showRequiredText: {
    type: Boolean,
    required: false,
    default: true
  },
  // Alle Felder - Readonly
  readOnlyAllFields: {
    type: Boolean,
    required: false,
    default: false
  },
  // Alle Felder - disabled
  disabledAllFields: {
    type: Boolean,
    required: false,
    default: false
  }
});

// Store - Übersetzungen
const storeTranslation = useTranslationStore();
const {components, generals} = storeToRefs(storeTranslation);

// Erforderlichen Felder
const requiredFields = ref([]);
const requiredFieldsTrue = ref([]);

/**
 * Pflichtfelder finden
 * @returns {Promise<void>}
 */
const findRequiredFields = async () => {
  for (const [key, value] of Object.entries(props.fields)) {
    if (props.fields[key].required) {
      requiredFields.value.push(key);
    }
  }
};

/**
 * Prüfen, ob die erforderlichen Felder ausgefüllt sind
 * @returns {Promise<void>}
 */
const checkRequiredFields = () => {
  requiredFields.value.forEach(field => {
    let findField = Object.entries(props.fields).filter(element => field === element[0])

    if (findField && findField.length > 0 && findField[0].length > 0 &&
        findField[0][1].fieldType === 'dropDown' && props.item[field].id && props.item[field].id.length > 0
    ) {
      if (!requiredFieldsTrue.value.includes(field)) {
        requiredFieldsTrue.value.push(field);
      }
    } else if (props.item[field].toString().length > 0) {
      if (!requiredFieldsTrue.value.includes(field)) {
        requiredFieldsTrue.value.push(field);
      }
    } else {
      requiredFieldsTrue.value = []
    }
  });
  // Wenn die Pflichtfelder nicht befüllt sind, dann den Knopf deaktivieren
  if (requiredFieldsTrue.value.length !== requiredFields.value.length) {
    emit('enabledActionButton', true);
  } else {
    emit('enabledActionButton', false);
  }
};

// Wird beim ausgeführt beim Laden der Komponente
onMounted(async () => {
  await findRequiredFields();
  await checkRequiredFields();
});

// Überwachung von den erforderlichen Feldern
watch(props, (newValue) => {
  checkRequiredFields();
});

</script>
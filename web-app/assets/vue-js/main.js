import {createApp} from 'vue'
import PrimeVue from 'primevue/config';
import de from './de.json';
/* Store Pinia */
import {createPinia} from 'pinia'

/* Vue Router */
import router from './router'

import App from './App.vue'

// BalmUi
import BalmUI from 'balm-ui'; // Official Google Material Components
import BalmUIPlus from 'balm-ui-plus'; // BalmJS Team Material Components
import 'balm-ui-css';

// PrimeVue Components
import Button from "primevue/button"
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup'; // optional
import Row from 'primevue/row'; // optional
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';
import Message from 'primevue/message';
import Dropdown from 'primevue/dropdown';
import MultiSelect from 'primevue/multiselect';
import Calendar from 'primevue/calendar';
import TriStateCheckbox from 'primevue/tristatecheckbox';
import Checkbox from 'primevue/checkbox';
import ToggleButton from 'primevue/togglebutton';
import Card from 'primevue/card';
import ProgressSpinner from 'primevue/progressspinner';
import ProgressBar from 'primevue/progressbar';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import Textarea from 'primevue/textarea';

// PrimeVue
// Flex
import "/node_modules/primeflex/primeflex.css";
// theme
import "primevue/resources/themes/md-dark-indigo/theme.css";
// core
import "primevue/resources/primevue.min.css";
// icons
import "primeicons/primeicons.css";
// Default Style
import "../styles/_default.scss"

const app = createApp(App)
const pinia = createPinia()

app.component('Button', Button);
app.component('Dialog', Dialog);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('InputNumber', InputNumber);
app.component('InputSwitch', InputSwitch);
app.component('InputText', InputText);
app.component('Textarea', Textarea);
app.component('Toast', Toast);
app.component('Message', Message);
app.component('ConfirmDialog', ConfirmDialog);
app.component('Dropdown', Dropdown);
app.component('TriStateCheckbox', TriStateCheckbox);
app.component('Checkbox', Checkbox);
app.component('ToggleButton', ToggleButton);
app.component('Card', Card);
app.component('ProgressSpinner', ProgressSpinner);
app.component('Calendar', Calendar);
app.component('MultiSelect', MultiSelect);
app.component('ProgressBar', ProgressBar);

app.use(pinia)
app.use(router)
app.use(BalmUI, {
    $theme: {
        'primary': "#ffffff",
        'on-surface': "#ffffff"
    }
});
app.use(BalmUIPlus);
app.use(PrimeVue, {ripple: true, locale: de.de})
app.use(ConfirmationService);
app.use(ToastService);

app.mount('#app')
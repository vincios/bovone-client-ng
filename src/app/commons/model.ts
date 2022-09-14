/* eslint-disable */
export interface BovoneDataObject {
  // Date_Hour_Day: string; // Giorno
  // Date_Hour_Month: string; // Mese
  // Date_Hour_Year: string; // Anno
  // Date_Hour_Hour: string; // Ore
  // Date_Hour_Minute: string; // Minuti
  // Date_Hour_Second: string; // Secondi
  // Date_Hour_Weekday: string; // Giorno della settimana
  time: string; // time as utc string
  partial_meter_worked: number; // Contametri Parziale (m)
  total_meter_worked: number; // Contametri Totale (m)
  conveyor_run: number; // 1=traino in movimento 0=traino fermo
  conveyor_potentiometer_actual_read_points: number; // Punti ingegneristici letti dal potenziometro della velocità
  conveyor_actual_value_in_mtmin: number; // Velocità attuale in mt/min.
  glass_presence_in_machine: number; // 1=presenza vetro in macchina 0=macchina vuota
  active_alarms_presence: number; // 1=allarmi presenti 0=nessun allarme Ufficio Tecnico Elettrico
  thickness_potentiometer_points_read: number; // Punti ingegneristici letti dal potenziometro dello spessore
  thickness_actual_value_in_mm: number; // Valore attuale dello spessore in mm
  thickness_visualized_in_hmi: number; // Spessore visualizzato su pannello operatore
  thickness_final_positioning_quote: number; // Quota di posizionamento finale asse spessore
  remain_potentiometer_points_read: number; // Punti ingegneristici letti dal potenziometro del tallone
  remain_actual_value_in_mm: number; // Valore attuale del tallone in mm
  remain_visualized_in_hmi: number; // Valore del tallone visualizzato a pannello
  remain_final_positioning_quote: number; // Quota di posizionamento finale asse tallone
  angle_potentiometer_points_read: number; // Punti ingegneristici letti dall’inclinometro dell’asse angolo
  angle_actual_value_in_mm: number; // Valore attuale asse angolo in mm
  angle_visualized_in_hmi: number; // Valore asse angolo visualizzato a pannello
  angle_final_positioning_quote: number; // Quota di posizionamento finale asse angolo
  status_alarm_presence: number; // 1=allarmi presenti 0=macchina ok
  status_wheel_1_2: number; // 0=mole ferme 1=mole in movimento 2=avaria
  status_wheel_3_4_5: number; // 0=mole ferme 1=mole in movimento 2=avaria
  status_wheel_6_7: number; // 0=mole ferme 1=mole in movimento 2=avaria
  status_wheel_8_9: number; // 0=mole ferme 1=mole in movimento 2=avaria
  status_wheel_10_11: number; // 0=mole ferme 1=mole in movimento 2=avaria
  status_cooling_pump: number; // 0=pompa acqua raffreddamento ferma 1=pompa acqua raffreddamento accesa 2=pompa in avaria
  status_mixer_cerium: number; // 0=mixer cerio fermo 1=mixer cerio in movimento2=mixer cerio in avaria
  status_pump_cerium: number; // 0=pompa cerio ferma 1=pompa cerio accesa 2=pompa cerio in avaria
  status_thickness_axis: number; // 0=asse spessore fermo 1=asse spessore in movimento 2=asse spessore in avaria
  status_removal_axis: number; // (Optional) 0=asse asportazione automatica ferma 1=asse asportazione automatica in movimento 2=asse asportazione in avaria
  status_inclusion_exclusion_wheel_6: number; // (Optional) 0=mola 6 esclusa 1=mola 6 inclusa
  status_brushes_motor_companion: number; // (Optional) 0=spazzole Companion ferme 1=spazzole Companion in movimento 2=avaria spazzole Companion
  status_fan_companion: number; // (Optional) 0=ventola Companion ferme 1=ventola Companion in movimento 2=avaria ventola Companion
  status_ev_h2o_companion: number; // (Optional) 1=EV H2O Companion Aperta 0=EV H2O Companion Chiusa
  status_image_visualized_on_hmi_angle_axis_quote: number; // Variabile utilizzata per il cambio della grafica a pannello asse angolo
  status_image_visualized_on_hmi_angle_axis: number; // Variabile utilizzata per il cambio della grafica a pannello asse angolo
}

export interface ExtendedBovoneDataObject extends BovoneDataObject {
  label: string;
}
export interface NumberConversionModel {
  exact?: number;
  from?: number;
  to?: number;
  displayedValue: string;
}

export interface BovoneWidgetDefinition {
  id: string;
  widgetType: "chart" | "number";
  keys: string[];
  description?: string;
  title?: string;
  conversionModels?: NumberConversionModel[];
}


export const BovoneCharts: BovoneWidgetDefinition[] = [
  {
    id: "partial_meter_worked",
    widgetType: "chart",
    title: "Partial Meter Worked",
    description: "translate:BOVONE.DATA.DESCRIPTION.PARTIAL_METER_WORKED",
    keys: ["partial_meter_worked"],
  }
]

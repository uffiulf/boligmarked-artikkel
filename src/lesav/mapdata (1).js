var simplemaps_countrymap_mapdata={
  main_settings: {
   //General settings
    width: "responsive", //'700' or 'responsive'
    background_color: "#FFFFFF",
    background_transparent: "yes",
    border_color: "#ffffff",
    
    //State defaults
    state_description: "State description",
    state_color: "#88A4BC",
    state_hover_color: "#3B729F",
    state_url: "",
    border_size: 1.5,
    all_states_inactive: "no",
    all_states_zoomable: "yes",
    
    //Location defaults
    location_description: "Location description",
    location_url: "",
    location_color: "#FF0067",
    location_opacity: 0.8,
    location_hover_opacity: 1,
    location_size: 25,
    location_type: "square",
    location_image_source: "frog.png",
    location_border_color: "#FFFFFF",
    location_border: 2,
    location_hover_border: 2.5,
    all_locations_inactive: "no",
    all_locations_hidden: "no",
    
    //Label defaults
    label_color: "#ffffff",
    label_hover_color: "#ffffff",
    label_size: 16,
    label_font: "Arial",
    label_display: "auto",
    label_scale: "yes",
    hide_labels: "no",
    hide_eastern_labels: "no",
   
    //Zoom settings
    zoom: "yes",
    manual_zoom: "yes",
    back_image: "no",
    initial_back: "no",
    initial_zoom: "-1",
    initial_zoom_solo: "no",
    region_opacity: 1,
    region_hover_opacity: 0.6,
    zoom_out_incrementally: "yes",
    zoom_percentage: 0.99,
    zoom_time: 0.5,
    
    //Popup settings
    popup_color: "white",
    popup_opacity: 0.9,
    popup_shadow: 1,
    popup_corners: 5,
    popup_font: "12px/1.5 Verdana, Arial, Helvetica, sans-serif",
    popup_nocss: "no",
    
    //Advanced settings
    div: "map",
    auto_load: "yes",
    url_new_tab: "no",
    images_directory: "default",
    fade_time: 0.1,
    link_text: "View Website",
    popups: "detect",
    state_image_url: "",
    state_image_position: "",
    location_image_url: ""
  },
  state_specific: {
    NO03: {
      name: "Oslo"
    },
    NO11: {
      name: "Rogaland"
    },
    NO15: {
      name: "Møre og Romsdal"
    },
    NO18: {
      name: "Nordland"
    },
    NO30: {
      name: "Viken"
    },
    NO34: {
      name: "Innlandet"
    },
    NO38: {
      name: "Vestfold og Telemark"
    },
    NO42: {
      name: "Agder"
    },
    NO46: {
      name: "Vestland"
    },
    NO50: {
      name: "Trøndelag"
    },
    NO54: {
      name: "Troms og Finnmark"
    }
  },
  locations: {
    "0": {
      name: "Oslo",
      lat: "59.916667",
      lng: "10.75"
    },
    "1": {
      lat: 58.971,
      lng: 5.731,
      name: "Stavanger"
    },
    "2": {
      lat: 63.431,
      lng: 10.392,
      name: "Trondheim"
    },
    "3": {
      lat: 60.391,
      lng: 5.333,
      name: "Bergen"
    },
    "5": {
      lat: "69.6498",
      lng: "18.9841",
      name: "Tromsø"
    }
  },
  labels: {
    NO03: {
      name: "Oslo",
      parent_id: "NO03"
    },
    NO11: {
      name: "Rogaland",
      parent_id: "NO11"
    },
    NO15: {
      name: "Møre og Romsdal",
      parent_id: "NO15"
    },
    NO18: {
      name: "Nordland",
      parent_id: "NO18"
    },
    NO30: {
      name: "Viken",
      parent_id: "NO30"
    },
    NO34: {
      name: "Innlandet",
      parent_id: "NO34"
    },
    NO38: {
      name: "Vestfold og Telemark",
      parent_id: "NO38"
    },
    NO42: {
      name: "Agder",
      parent_id: "NO42"
    },
    NO46: {
      name: "Vestland",
      parent_id: "NO46"
    },
    NO50: {
      name: "Trøndelag",
      parent_id: "NO50"
    },
    NO54: {
      name: "Troms og Finnmark",
      parent_id: "NO54"
    }
  },
  legend: {
    entries: []
  },
  regions: {}
};
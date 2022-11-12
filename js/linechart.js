class linechart {
    /**
     * Constructor for the line chart
     * @param {} data 
     */
    constructor(data) {
        this.cardData = data;

        const CHART_WIDTH = 750;
        const CHART_HEIGHT = 500;
        this.yAxisPadding = 80;
        this.xAxisPadding = 50;

        //Note: This is just preliminery and doesn't account for flip cards
        let artist_grouped = d3.group(this.cardData, d => d.artist, d => d.illustration_id);

        //We use this one as a better storage for the data
        let artist_art_date = new Map();

        artist_grouped.forEach((arts, artist) => {
            let art_date = new Map();
            arts.forEach(art => {
                let art_min_date = d3.min(art, d => d.released_at);
                art_date.set(art, art_min_date);
            });
            artist_art_date.set(artist, art_date);
        });


        console.log("Artist, art, date", artist_art_date);

        /*
        this.xAxis = d3.scaleTime()
            .domain(d3.extent(globalApplicationState.covidData.map((row) => new Date(row.date))))
            .range([0, CHART_WIDTH - this.yAxisPadding]);
        */
    }
}
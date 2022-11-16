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
        this.artist_grouped = d3.group(this.cardData, d => d.artist, d => d.illustration_id);

        //We use this one as a better storage for the data
        this.artist_art_date = new Map();
        this.artist_grouped.forEach((arts, artist) => {
            let art_date = new Map();
            arts.forEach(art => {
                let art_min_date = d3.min(art, d => d.released_at);
                art_date.set(art, this.ParseDate(art_min_date));
            });
            this.artist_art_date.set(artist, art_date);
        });
        console.log(this.artist_art_date);

        //Setting the two axis
        this.xAxis = d3.scaleTime()
            .domain(this.GetMaxMinDates(this.artist_art_date))
            .range([0, CHART_WIDTH - this.yAxisPadding])
            .nice();
        this.yAxis = d3.scaleLinear()
            .domain([0, this.GetMaxUniqueArts(this.artist_art_date)])
            .range([0, CHART_HEIGHT - this.xAxisPadding])
            .nice();
    }

    /**
     * Takes in a string with YYYY-MM-DD date implementation
     * Takes code from: https://stackoverflow.com/questions/2587345/why-does-date-parse-give-incorrect-results/2587398#2587398
     * @param {*} string 
     * @returns Date
     */
    ParseDate(string){
        let parts = string.split('-');

        return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
    }

    /**
     * Finds the minimum and maximum dates for the time scale
     * @param {*} artist_art_date 
     * @returns [Min, Max]
     */
    GetMaxMinDates(artist_art_date){
        let maxDate = [...[...[...artist_art_date][0]][1]][0][1];
        let minDate = [...[...[...artist_art_date][0]][1]][0][1];
        
        artist_art_date.forEach((arts, artist) => {
            arts.forEach((date, art) => {
                if(date > maxDate){
                    maxDate = date;
                }
                if(date < minDate){
                    minDate = date;
                }
            });
        });
        return [minDate, maxDate];
    }

    /**
     * Finds the maximum number of pieces that a single artist has done for the y-scale
     * @param {} artist_art_date 
     * @returns Max
     */
    GetMaxUniqueArts(artist_art_date){
        let maxArts = 0;

        artist_art_date.forEach((arts, artist) => {
            if(arts.size > maxArts){
                maxArts = arts.size;
            }
        });

        return maxArts;
    }
}
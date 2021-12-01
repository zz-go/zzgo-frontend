export default {
    data() {
        return {
        };
    },
    methods: {
        format_date(date, format) {
			const f = (typeof format !== 'undefined') ? format : 'd.m.Y H:i';

			const d = new Date(date);
			const day = (d.getDate() < 10) ? "0" + d.getDate() : d.getDate();
			const month = (Number(d.getMonth()) + 1 < 10) ? "0" + String((Number(d.getMonth()) + 1)) : Number(d.getMonth()) + 1;
			const year = d.getFullYear();

			const hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
			const minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
			
			let retval = f.replace('d', day);
			retval = retval.replace('m', month);
			retval = retval.replace('Y', year);
			retval = retval.replace('H', hours);
			retval = retval.replace('i', minutes);
			
			return retval;
        }
    },
};

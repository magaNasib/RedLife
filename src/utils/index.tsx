export const TimeConverter = ({ date }: { date: any }) => {
    const now: any = new Date();

    // Calculate the time difference in seconds and minutes
    const timeDifferenceInSeconds = Math.floor((now - date) / 1000);
    const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);

    let diffTime;

    if (timeDifferenceInSeconds < 60) {
        diffTime = `${timeDifferenceInSeconds} seconds ago`;

    } else if (timeDifferenceInMinutes < 60) {
        diffTime = `${timeDifferenceInMinutes} minutes ago`;
        console.log(diffTime);
        

    } else if (timeDifferenceInMinutes >= 60 && timeDifferenceInMinutes < 1440) {
        // Calculate hours ago
        const hoursAgo = Math.floor(timeDifferenceInMinutes / 60);
        diffTime = `${hoursAgo} hours ago`;

    } else if (timeDifferenceInMinutes >= 1440) {
        // More than 1 day, show month and day
        const options = { month: 'short', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options as Intl.DateTimeFormatOptions); // Cast options to the correct type
        diffTime = `Published on ${formattedDate}`;

    }

}
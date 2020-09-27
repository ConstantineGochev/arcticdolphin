export const toolNames = {
    YOUTUBE_DL: 'youtube-dl',
    RIP_ME: 'ripme',
    GALLERY_DL : 'gallery-dl'
}

export const youtubedlStaticOptions = {
    'ignore errors': '-i',
    'abort on error': '--abort-on-error',
    'dump user agent': '--dump-user-agent',
    'list extractors': '--list-extractors',
    'flat playlist': '--flat-playlist',
    'mark watched': '--mark-watched',
    'no mark watched': '--no-mark-watched',
    'bypass geographic restrictions': '--geo-bypass',
    'download only the video if a playlist and video': '--no-playlist',
    'download the playlist if a playlist and video': '--yes-playlist',
    'skip unavailable fragments': '--skip-unavailable-fragments',
    'abort on unavailable fragment': '--abort-on-unavailable-fragment',
    'keep fragments after download is finished': '--keep-fragments',
    'restrict filenames to only ASCII chars': '--restrict-filenames',
    'do not overwrite files': '--no-overwrites',
    'no part files write directly to output file': '--no-part',

}
export const youtubedlDynamicOptions = {
    'prefix for unqualified URLs': '--default-search' ,
    'Use the specified HTTP/HTTPS/SOCKS proxy': '--proxy' ,
    'Time to wait before giving up, in seconds': '--socket-timeout' ,
    'Client-side IP address to bind to': '--source-address' ,
    'Playlist video to start at (default is 1)': '--playlist-start' ,
    'Playlist video to end at (default is last)': '--playlist-end' ,
    'Download only matching titles (regex or caseless sub-string)': '--match-title' ,
    'Skip download for matching titles': '--reject-title' ,
    'Do not download any videos smaller than kilobytes': '--min-filesize' ,
    'Do not download any videos larger than kilobytes': '--max-filesize' ,
    'Download only videos uploaded in this date': '--date' ,
    'Download only videos uploaded on or before': '--datebefore' ,
    'Download only videos uploaded on or after': '--dateafter' ,
    'Do not download any videos with less than views': '--min-views' ,
    'Do not download any videos with more than views': '--max-views' ,
    'Download only videos suitable for the given age': '--age-limit' ,
    'Maximum download rate in bytes per second':'--limit-rate',
    'Number of retries (default is 10)':'--retries',
    ' Number of seconds to sleep before each download':'--sleep-interval',
    'Specify audio format':'--audio-format',

}
export const jobOptions = {
    'Delay the job certain miliseconds':'delay',
    'Add priority value': 'priority',
    'Reapeat the job every miliseconds *must add limit':'every',
    'Add limit how many times the job is repeated': 'limit',
    'Repeat according to CRON job specifications': 'cron'
}
export function getDynamicOption (option, param) {
    return option + ' ' + param
}
export const ripmeStaticOptions = {
    'don\'t retry after a 404': '--skip404',
    'save order of images in folder': '--saveorder',
    'don\'t save order of images in folder': '--nosaveorder',
    'don\'t create properties file': '--no-prop-file',
    're-rip all ripped albums': '--rerip',
    'overwrite existing files': '--overwrite'
}

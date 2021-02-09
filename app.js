document.getElementById('submit').addEventListener('click', function(){
    const searchValue = document.getElementById('search-value').value;
    const url = `https://api.lyrics.ovh/suggest/${searchValue}`;
    //console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displaySong(data.data))
    .catch(error => displayError('Something Went Wrong! Please try again later!'))
})

const displaySong = songs => {
    const songContainer = document.getElementById('song-container');  
    songContainer.innerHTML = '';
    songs.forEach(song => {
        const mainDiv = document.createElement('div');
        mainDiv.className = 'single-result row align-items-center my-3 p-3';
        html = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
            <source src="${song.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;
        mainDiv.innerHTML = html;
        songContainer.appendChild(mainDiv);
    })
    
}

const getLyrics = (name, title) =>{
    const url2 = `https://api.lyrics.ovh/v1/${name}/${title}`;
    fetch(url2)
    .then(res => res.json())
    .then(data => displayLyrics(data.lyrics))
}

const displayLyrics = (lyrics) =>{
    const getLyrics = document.getElementById('lyrics');
    getLyrics.innerText = lyrics;
}
const displayError = (error) =>{
    const errorTag = document.getElementById('error');
    errorTag.innerText = error;
}
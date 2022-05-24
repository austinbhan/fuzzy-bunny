import { checkAuth, deleteBunny, getFamilies, logout } from '../fetch-utils.js';

checkAuth();

const familiesEl = document.querySelector('.families-container');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

async function displayFamilies() {
    familiesEl.textContent = '';
    // fetch families from supabase
    const data = await getFamilies();
        // Create Your Render Function
    for (let family of data) {
        // create three elements for each family, one for the whole family, one to hold the name, and one to hold the bunnies
        // your HTML Element should look like this:

        const familyDiv = document.createElement('div');
        familyDiv.setAttribute('class', 'family');

        // <h3>the Garcia family</h3>
        const h3 = document.createElement('h3');
        h3.textContent = family.name;

        // <div class="bunnies">
        const bunnies = document.createElement('ul');
        bunnies.setAttribute('class', 'bunnies');

        // <div class="bunny">Fluffy</div>
        // <div class="bunny">Bob</div>
        for (let bunny of family.fuzzy_bunnies) {
            const bunnyDiv = document.createElement('li');
            bunnyDiv.textContent = bunny.name;
            bunnyDiv.setAttribute('id', `${bunny.name}`);

            bunnyDiv.addEventListener('click', async () => {
                await deleteBunny(bunny.id);
                await displayFamilies();
            });
            
            bunnies.append(bunnyDiv);
            
        }
        
        familiesEl.append(familyDiv);
        familyDiv.append(h3, bunnies);
        
        // add the bunnies css class to the bunnies el, and family css class to the family el
        // put the family name in the name element
        // for each of this family's bunnies
        //    make an element with the css class 'bunny', and put the bunny's name in the text content
        //    add an event listener to the bunny el. On click, delete the bunny, then refetch and redisplay all families.
        // append this bunnyEl to the bunniesEl

    // append the bunniesEl and nameEl to the familyEl

    // append the familyEl to the familiesEl
    }
}
displayFamilies();
export const recipes = [
    {
        id: 1,
        title: 'Paste Carbonara',
        imageUrl: 'https://placehold.co/800x400?text=Carbonara',
        description: 'O rețetă clasică italiană cu ouă, brânză, pancetta și piper.',
        ingredients: ['400g spaghete', '150g guanciale/pancetta', '4 gălbenușuri', '100g Pecorino Romano', 'Piper negru proaspăt măcinat'],
        steps: ['Fierbeți pastele în apă cu sare.', 'Prăjiți guanciale până devine crocant.', 'Amestecați gălbenușurile cu brânza și piperul.', 'Combinați pastele fierbinți cu amestecul de ouă și guanciale.'],
        cookingTime: 20,
        isFavorite: false,
        category: 'Paste'
    },
    {
        id: 2,
        title: 'Salată Caesar',
        imageUrl: 'https://placehold.co/800x400?text=Caesar',
        description: 'Salată proaspătă cu crutoane, parmezan și sos special.',
        ingredients: ['Salată Romaine', 'Crutoane', 'Parmezan', 'Piept de pui (opțional)', 'Sos Caesar'],
        steps: ['Spălați și rupeți salata.', 'Adăugați crutoanele și parmezanul.', 'Turnați sosul și amestecați bine.', 'Serviți imediat.'],
        cookingTime: 15,
        isFavorite: true,
        category: 'Salate'
    },
    {
        id: 3,
        title: 'Tiramisu',
        imageUrl: 'https://placehold.co/800x400?text=Tiramisu',
        description: 'Desert elegant cu pișcoturi, cafea și mascarpone.',
        ingredients: ['500g Mascarpone', '4 ouă', '100g zahăr', '300ml cafea tare', 'Pișcoturi', 'Cacao'],
        steps: ['Separați ouăle și bateți gălbenușurile cu zahăr.', 'Adăugați mascarpone.', 'Bateți albușurile spumă și încorporați.', 'Înmuiați pișcoturile în cafea și asamblați straturile.'],
        cookingTime: 45,
        isFavorite: true,
        category: 'Desert'
    }
];

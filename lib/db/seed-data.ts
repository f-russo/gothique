/**
 * The seed catalogue: 100 gothic works, all drawn from Project Gutenberg.
 *
 * `gutenbergId` is the canonical Project Gutenberg ebook number. The cover and
 * reading URLs are derived from it:
 *   cover:  https://www.gutenberg.org/cache/epub/{id}/pg{id}.cover.medium.jpg
 *   ebook:  https://www.gutenberg.org/ebooks/{id}
 *
 * Descriptions are original, gothic-flavoured blurbs written for the archive.
 */

export interface SeedBook {
  gutenbergId: number;
  title: string;
  author: string;
  year: number;
  description: string;
}

export const seedBooks: SeedBook[] = [
  // ── The foundations of the Gothic (1764–1826) ──────────────────────────
  {
    gutenbergId: 696,
    title: "The Castle of Otranto",
    author: "Horace Walpole",
    year: 1764,
    description:
      "A giant helmet crashes through a marriage; a curse stirs in an ancient castle. The novel that taught Europe how to shudder, and set every haunted manor after it alight.",
  },
  {
    gutenbergId: 3268,
    title: "The Mysteries of Udolpho",
    author: "Ann Radcliffe",
    year: 1794,
    description:
      "Young Emily is drawn into a crumbling Italian castle where veiled figures, secret passages, and a mother's dying warning braid into the queen of the 'explained' Gothic.",
  },
  {
    gutenbergId: 601,
    title: "The Monk",
    author: "Matthew Gregory Lewis",
    year: 1796,
    description:
      "Ambition, lust, and a vow broken in a Spanish monastery. The wildest, darkest, most scandalous of the early Gothics — a fever-dream of sin and punishment.",
  },
  {
    gutenbergId: 6087,
    title: "The Vampyre",
    author: "John William Polidori",
    year: 1819,
    description:
      "Told by a traveller who met the wrong nobleman on the road, the story that gave the vampire its pale, aristocratic face — and its hunger for the living.",
  },
  {
    gutenbergId: 84,
    title: "Frankenstein; or, The Modern Prometheus",
    author: "Mary Shelley",
    year: 1818,
    description:
      "A young scientist stitches life from dead things and is undone by his own making. The founding myth of the monster that loves, and the creator who cannot bear it.",
  },
  {
    gutenbergId: 15238,
    title: "Mathilda",
    author: "Mary Shelley",
    year: 1819,
    description:
      "A father's obsessive love, a daughter's quiet horror, and a marriage entered in despair. Shelley's dark, unfinished meditation on the bonds that bind and break the soul.",
  },
  {
    gutenbergId: 18247,
    title: "The Last Man",
    author: "Mary Shelley",
    year: 1826,
    description:
      "In the year 2440 a plague empties the earth, and one old man remembers what was lost. Shelley's apocalyptic vision — grief written across the end of the world.",
  },

  // ── Bram Stoker & the vampire's golden age ─────────────────────────────
  {
    gutenbergId: 345,
    title: "Dracula",
    author: "Bram Stoker",
    year: 1897,
    description:
      "Assembled from letters and diaries, the slow crossing of Count Dracula from Transylvania to England — and the war of candles, garlic, and the sacred against the dark.",
  },
  {
    gutenbergId: 3095,
    title: "The Lady of the Shroud",
    author: "Bram Stoker",
    year: 1899,
    description:
      "A mummified bride, a secret in a mountain chapel, and a vow older than the church. Stoker's strangest novel, where death itself is kept waiting in a shroud.",
  },
  {
    gutenbergId: 3781,
    title: "The Jewel of Seven Stars",
    author: "Bram Stoker",
    year: 1903,
    description:
      "An Egyptologist's wife dies — and something ancient, buried with a cursed jewel, begins to wake. Stoker's own 'answer to Dracula', steeped in sand and older gods.",
  },
  {
    gutenbergId: 68966,
    title: "The Snake's Pass",
    author: "Bram Stoker",
    year: 1903,
    description:
      "In a remote Irish valley, a family's dark inheritance surfaces with the turning of the seasons. A slow-burning rural Gothic of land, blood, and things that should stay buried.",
  },
  {
    gutenbergId: 42455,
    title: "The Mystery of the Sea",
    author: "Bram Stoker",
    year: 1906,
    description:
      "A scientist's obsession with a drowned woman pulls him into a marriage with the sea itself. Stoker's maritime Gothic, where the tide keeps what it is owed.",
  },
  {
    gutenbergId: 1188,
    title: "The Lair of the White Worm",
    author: "Bram Stoker",
    year: 1911,
    description:
      "A film crew in a Suffolk village disturbs a barrow that must never be opened. Stoker's final, most fantastical novel — a white worm, a lost kingdom, and a price paid in flesh.",
  },
  {
    gutenbergId: 2520,
    title: "The Man",
    author: "Bram Stoker",
    year: 1912,
    description:
      "A theatre manager, a vanishing wife, and a double that will not stay dead. Stoker's late, restless novel of identity and the stage, where the mask outlives the face.",
  },
  {
    gutenbergId: 65799,
    title: "Lady Athlyne",
    author: "Bram Stoker",
    year: 1913,
    description:
      "A beautiful, vengeful woman and the man who wronged her, bound across a generation. A brooding tale of obsession and retribution in the English countryside.",
  },
  {
    gutenbergId: 10150,
    title: "Dracula's Guest",
    author: "Bram Stoker",
    year: 1914,
    description:
      "A young Englishman in a Transylvanian village befriends the wrong guest. A short, chilling Stoker tale that circles the world of Dracula without ever naming it.",
  },

  // ── Sheridan Le Fanu ───────────────────────────────────────────────────
  {
    gutenbergId: 10007,
    title: "Carmilla",
    author: "Sheridan Le Fanu",
    year: 1872,
    description:
      "A lonely girl in the Austrian mountains is taken under the wing of a charming, sleepwalking visitor. The story that turned the vampire's gaze inward — and made it unforgettable.",
  },
  {
    gutenbergId: 14851,
    title: "Uncle Silas",
    author: "Sheridan Le Fanu",
    year: 1864,
    description:
      "A lamed, kindly uncle, a scheming aunt, and a fortune that changes hands with a will. Le Fanu's great Victorian novel of secrets, hypnosis, and the house that keeps its counsels.",
  },
  {
    gutenbergId: 11635,
    title: "Green Tea; Mr. Justice Harbottle",
    author: "Sheridan Le Fanu",
    year: 1872,
    description:
      "A woman's habit becomes a doorway to the other side; a magistrate's conscience becomes a haunting. Two of Le Fanu's most perfect ghost stories, served cold.",
  },
  {
    gutenbergId: 11610,
    title: "Madam Crowl's Ghost and the Dead Sexton",
    author: "Sheridan Le Fanu",
    year: 1873,
    description:
      "A dead woman returns to settle a debt of gratitude; a gravedigger's secret walks the churchyard at night. Le Fanu at his most tender and most terrible.",
  },
  {
    gutenbergId: 9502,
    title: "The Room in the Dragon Volant",
    author: "Sheridan Le Fanu",
    year: 1872,
    description:
      "A traveller checks into a Venetian inn and is shown a room that should not exist. A compact, airtight ghost story — the blueprint for the modern haunted hotel.",
  },
  {
    gutenbergId: 26451,
    title: "A Stable for Nightmares",
    author: "Sheridan Le Fanu",
    year: 1894,
    description:
      "A country house, a family's hidden shame, and a stable that harbours more than horses. Le Fanu's late, dreamlike novel of inheritance and the things that breed in the dark.",
  },

  // ── The Brontës & Jane Austen ──────────────────────────────────────────
  {
    gutenbergId: 1260,
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    year: 1847,
    description:
      "An orphaned governess, a moorland mansion, a madwoman in the attic, and a love that defies every law but its own. The Gothic novel that made the soul the main character.",
  },
  {
    gutenbergId: 768,
    title: "Wuthering Heights",
    author: "Emily Brontë",
    year: 1847,
    description:
      "On the bleak Yorkshire moors, two souls love each other with a ferocity that outlives the grave. The most violent, most beautiful obsession in the English language.",
  },
  {
    gutenbergId: 969,
    title: "The Tenant of Wildfell Hall",
    author: "Anne Brontë",
    year: 1848,
    description:
      "A woman leaves her drunken husband and takes her child — and leaves behind a portrait that tells the truth. The novel that scandalised Victorian England and named what it would not.",
  },
  {
    gutenbergId: 121,
    title: "Northanger Abbey",
    author: "Jane Austen",
    year: 1817,
    description:
      "A young reader of Gothic novels mistakes a country house for a castle of horrors. Austen's sparkling parody — and the most affectionate love letter the genre ever received.",
  },

  // ── Wilkie Collins & the sensation novel ───────────────────────────────
  {
    gutenbergId: 583,
    title: "The Woman in White",
    author: "Wilkie Collins",
    year: 1859,
    description:
      "A painter witnesses a woman in white walking in terror through the dark — and a life of identity, forgery, and revenge unfolds. Collins' masterwork of the detective Gothic.",
  },
  {
    gutenbergId: 155,
    title: "The Moonstone",
    author: "Wilkie Collins",
    year: 1868,
    description:
      "A cursed diamond, a stolen jewel, and a house full of suspects on the night of the wedding. Often called the first English detective novel — and a Gothic in disguise.",
  },
  {
    gutenbergId: 1438,
    title: "No Name",
    author: "Wilkie Collins",
    year: 1862,
    description:
      "A daughter who does not know her own name, a secret kept for twenty years, and a fortune built on a lie. Collins' quiet, devastating study of a family's buried shame.",
  },
  {
    gutenbergId: 1895,
    title: "Armadale",
    author: "Wilkie Collins",
    year: 1866,
    description:
      "A prophecy, a stolen heir, and a vendetta that crosses the sea. Collins' most sprawling and superstitious novel, where fate wears the mask of coincidence.",
  },
  {
    gutenbergId: 43092,
    title: "The Dead Secret",
    author: "Wilkie Collins",
    year: 1864,
    description:
      "A woman is blackmailed by a secret she does not yet know she keeps. A taut, claustrophobic Collins thriller of marriage, money, and the past that will not stay dead.",
  },
  {
    gutenbergId: 1622,
    title: "The Law and the Lady",
    author: "Wilkie Collins",
    year: 1875,
    description:
      "A wife's detective work outpaces the men who married her. Collins' sharp, modern novel of a woman who refuses to be a mystery to her own life.",
  },
  {
    gutenbergId: 1627,
    title: "The Evil Genius",
    author: "Wilkie Collins",
    year: 1879,
    description:
      "A young man's inheritance is guarded by a family curse and a guardian with a grudge. Collins' late, darkly comic novel of luck, blood, and the price of a name.",
  },
  {
    gutenbergId: 3632,
    title: "Poor Miss Finch",
    author: "Wilkie Collins",
    year: 1879,
    description:
      "A plain, kind woman marries a man who is not what he seems. A Gothic of the drawing-room, where the monster is a husband and the haunted house is a marriage.",
  },
  {
    gutenbergId: 1975,
    title: "The Legacy of Cain",
    author: "Wilkie Collins",
    year: 1867,
    description:
      "A family's criminal past follows its heirs like a stain. Collins' novel of inherited guilt, where the sin of the father is visited on the children.",
  },
  {
    gutenbergId: 1587,
    title: "The Black Robe",
    author: "Wilkie Collins",
    year: 1865,
    description:
      "A young woman's secret, a black-robed figure, and a London of fog and hidden doors. A compact Collins mystery of identity and the masks people wear to be safe.",
  },
  {
    gutenbergId: 1626,
    title: "After Dark",
    author: "Wilkie Collins",
    year: 1870,
    description:
      "A woman's life, told in the hours between sleeping and waking. Collins' most experimental novel — a mosaic of memory, guilt, and the dark that follows the sun.",
  },
  {
    gutenbergId: 1917,
    title: "The Queen of Hearts",
    author: "Wilkie Collins",
    year: 1859,
    description:
      "A handsome rogue, a stolen fortune, and a marriage that is a trap. Collins' early, roguish novel of deception in the drawing rooms of the rich.",
  },
  {
    gutenbergId: 7893,
    title: "Hide and Seek",
    author: "Wilkie Collins",
    year: 1865,
    description:
      "A woman is pursued by a past she cannot outrun, across England and into the sea. A Collins thriller of obsession, where the hunter and the hunted change places.",
  },
  {
    gutenbergId: 7892,
    title: "Heart and Science",
    author: "Wilkie Collins",
    year: 1875,
    description:
      "A brilliant, cold scientist and the woman who loves him — and the experiment that goes wrong. Collins' late, uneasy novel where reason meets the uncanny.",
  },
  {
    gutenbergId: 4605,
    title: "Basil",
    author: "Wilkie Collins",
    year: 1853,
    description:
      "A young artist's love, a rival's ambition, and a London of studios and secrets. Collins' first novel, all feeling and fog, before he learned to be a detective.",
  },
  {
    gutenbergId: 1625,
    title: "The Frozen Deep",
    author: "Wilkie Collins",
    year: 1857,
    description:
      "Two men, one woman, and a love that freezes the heart. A short, aching Collins tale of devotion and the cold that lives between people who care.",
  },
  {
    gutenbergId: 170,
    title: "The Haunted Hotel",
    author: "Wilkie Collins",
    year: 1878,
    description:
      "A Venetian hotel, a guest who will not leave, and a past that walks the corridors. Collins' atmospheric novel of a house that remembers every sin committed within it.",
  },

  // ── Braddon, Hume & Leroux ─────────────────────────────────────────────
  {
    gutenbergId: 8954,
    title: "Lady Audley's Secret",
    author: "Mary Elizabeth Braddon",
    year: 1862,
    description:
      "A beautiful, ambitious woman marries her way up — and buries a husband to do it. The sensation novel that invented the modern thriller, and the secret that won't stay kept.",
  },
  {
    gutenbergId: 10905,
    title: "Phantom Fortune",
    author: "Mary Elizabeth Braddon",
    year: 1883,
    description:
      "A fortune appears, a fortune vanishes, and a family is torn apart by gold. Braddon's sprawling novel of inheritance, imposture, and the ghosts of money.",
  },
  {
    gutenbergId: 73931,
    title: "The Cloven Foot",
    author: "Mary Elizabeth Braddon",
    year: 1878,
    description:
      "A mark on the foot, a curse on the name, and a family that cannot escape its past. Braddon's most Gothic novel, where superstition and sin walk hand in hand.",
  },
  {
    gutenbergId: 75840,
    title: "The Trail of the Serpent",
    author: "Mary Elizabeth Braddon",
    year: 1881,
    description:
      "A woman's revenge, a serpent's trail, and a house full of hidden doors. Braddon's dark, twisting novel of a woman who will not be a victim twice.",
  },
  {
    gutenbergId: 2868,
    title: "The Green Mummy",
    author: "Fergus Hume",
    year: 1891,
    description:
      "An Egyptian mummy, a stolen treasure, and a curse that crosses the sea to London. The sensation that made the world believe in the vengeance of the dead.",
  },
  {
    gutenbergId: 175,
    title: "The Phantom of the Opera",
    author: "Gaston Leroux",
    year: 1910,
    description:
      "Beneath the glittering opera house, in a labyrinth of tunnels and lakes, a disfigured genius keeps his dark court. The most famous monster of the modern age.",
  },
  {
    gutenbergId: 1686,
    title: "The Secret of the Night",
    author: "Gaston Leroux",
    year: 1907,
    description:
      "A crime reporter, a missing girl, and a city that keeps its darkest secrets after dark. Leroux's Parisian thriller, where the night is a character and the truth is a ghost.",
  },

  // ── Wilde, Jacobs, Gilman, James, Stevenson, Hogg ──────────────────────
  {
    gutenbergId: 174,
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    year: 1900,
    description:
      "A beautiful young man wishes his portrait would age instead of him — and the wish is granted. Wilde's perfect, poisonous novel of beauty, sin, and the face that cannot lie.",
  },
  {
    gutenbergId: 14522,
    title: "The Canterville Ghost",
    author: "Oscar Wilde",
    year: 1887,
    description:
      "An old English ghost is evicted by a practical American family. Wilde's witty, tender ghost story — the funniest haunting in the language, and the saddest.",
  },
  {
    gutenbergId: 773,
    title: "Lord Arthur Savile's Crime",
    author: "Oscar Wilde",
    year: 1891,
    description:
      "A young aristocrat learns, with terrible calm, that he is destined to commit murder. Wilde's most disturbing short story — a comedy that is not a joke at all.",
  },
  {
    gutenbergId: 42704,
    title: "Salomé",
    author: "Oscar Wilde",
    year: 1892,
    description:
      "A princess, a prophet, and a dance that costs a head. Wilde's one-act tragedy of desire and death, first written in French and banned for its beauty.",
  },
  {
    gutenbergId: 12122,
    title: "The Monkey's Paw",
    author: "W. W. Jacobs",
    year: 1902,
    description:
      "A dried monkey's paw grants three wishes — and teaches the price of each. The most perfect short horror story ever written, and the most feared knock at the door.",
  },
  {
    gutenbergId: 11188,
    title: "The Temptation of Samuel Burge",
    author: "W. W. Jacobs",
    year: 1894,
    description:
      "A gentle clerk is offered a fortune for a single, terrible act. Jacobs' quiet, chilling study of how far a good man will go when the devil is patient.",
  },
  {
    gutenbergId: 1952,
    title: "The Yellow Wallpaper",
    author: "Charlotte Perkins Gilman",
    year: 1892,
    description:
      "Confined to a nursery for her 'nerves', a young woman begins to see a woman creeping behind the yellow wallpaper. The most famous short story about madness — and the room that makes it.",
  },
  {
    gutenbergId: 209,
    title: "The Turn of the Screw",
    author: "Henry James",
    year: 1898,
    description:
      "A governess takes charge of two children in a remote English house — and sees two ghosts on the lawn. The most argued-over ghost story in literature, and the most uncanny.",
  },
  {
    gutenbergId: 42,
    title: "The Strange Case of Dr. Jekyll and Mr. Hyde",
    author: "Robert Louis Stevenson",
    year: 1886,
    description:
      "A respected doctor by day, a monster by night, separated by a potion. Stevenson's perfect novella of the double, and the door that the locked room cannot keep shut.",
  },
  {
    gutenbergId: 2276,
    title: "The Private Memoirs and Confessions of a Justified Sinner",
    author: "James Hogg",
    year: 1810,
    description:
      "A man's confession, written to a stranger, reveals a murder he cannot atone for. Scotland's darkest novel — a Gothic of guilt, where the devil is a friend and God is a judge.",
  },

  // ── Penny dreadfuls & Edgar Allan Poe ──────────────────────────────────
  {
    gutenbergId: 14833,
    title: "Varney the Vampyre",
    author: "Thomas Peckett Prest & James Malcolm Rymer",
    year: 1846,
    description:
      "A pale gentleman with a taste for the blood of the innocent haunts the streets of London. The penny-dreadful that made the vampire a household terror before Stoker refined him.",
  },
  {
    gutenbergId: 59828,
    title: "The String of Pearls",
    author: "Thomas Peckett Prest & James Malcolm Rymer",
    year: 1846,
    description:
      "A barber in Fleet Street, a string of pearls, and a series of disappearances that the city will not forget. The penny-dreadful that gave the world Sweeney Todd.",
  },
  {
    gutenbergId: 932,
    title: "The Fall of the House of Usher",
    author: "Edgar Allan Poe",
    year: 1839,
    description:
      "A decaying house, a dying family, and a twin who is buried alive. Poe's masterwork of atmosphere, where the building and the bloodline fall together into the earth.",
  },
  {
    gutenbergId: 1063,
    title: "The Cask of Amontillado",
    author: "Edgar Allan Poe",
    year: 1846,
    description:
      "'The thousand injuries of Fortunato I had borne as best I could, but when he attempted to insult me, I vowed revenge.' The most perfect short story of revenge ever told.",
  },
  {
    gutenbergId: 1064,
    title: "The Masque of the Red Death",
    author: "Edgar Allan Poe",
    year: 1842,
    description:
      "A prince locks his court in a castle to escape the plague — and the plague comes to the masquerade anyway. Poe's vision of death in a velvet mask, dancing to the end.",
  },
  {
    gutenbergId: 8893,
    title: "Selections from Poe",
    author: "Edgar Allan Poe",
    year: 1906,
    description:
      "The raven, the tell-tale heart, the pit and the pendulum, and the murders in the Rue Morgue — Poe's uncanny canon gathered in one volume, for the reader who wishes to be afraid.",
  },

  // ── Nathaniel Hawthorne ────────────────────────────────────────────────
  {
    gutenbergId: 77,
    title: "The House of the Seven Gables",
    author: "Nathaniel Hawthorne",
    year: 1851,
    description:
      "A cursed house, a family marked by an ancestor's sin, and a portrait that watches. Hawthorne's American Gothic, where the past is a tenant that will not pay its rent.",
  },
  {
    gutenbergId: 13707,
    title: "Twice-Told Tales",
    author: "Nathaniel Hawthorne",
    year: 1837,
    description:
      "The grey gentleman, the birth-mark, and the blasphemous joke — Hawthorne's first and finest collection, where the supernatural slips quietly into the everyday.",
  },
  {
    gutenbergId: 512,
    title: "Mosses from an Old Manse",
    author: "Nathaniel Hawthorne",
    year: 1836,
    description:
      "A minister's study, a minister's doubts, and the dark that lives in a good man's heart. Hawthorne's meditative Gothic, where the haunted place is the soul.",
  },
  {
    gutenbergId: 25344,
    title: "The Scarlet Letter",
    author: "Nathaniel Hawthorne",
    year: 1850,
    description:
      "A woman wears her sin in a letter of scarlet cloth, and a town watches her be punished for it. Hawthorne's great moral Gothic, where the symbol outlives the shame.",
  },

  // ── Herman Melville ────────────────────────────────────────────────────
  {
    gutenbergId: 15,
    title: "Moby-Dick; or, The Whale",
    author: "Herman Melville",
    year: 1851,
    description:
      "A captain's obsession with a white whale pulls a ship and its crew toward the end of the world. The great American novel — part epic, part apocalyptic, part Gothic at sea.",
  },
  {
    gutenbergId: 21816,
    title: "The Confidence-Man: His Masquerade",
    author: "Herman Melville",
    year: 1857,
    description:
      "A man of a thousand faces sells a thousand lies on a Mississippi steamboat. Melville's dark, satirical novel of a world where everyone is a con artist and trust is a ghost.",
  },
  {
    gutenbergId: 15859,
    title: "The Piazza Tales",
    author: "Herman Melville",
    year: 1856,
    description:
      "The Encantadas, the epic of the lost ships in the fog, and other tales from the edge of the map. Melville's strangest collection, where the sea is a graveyard and the fog a veil.",
  },
  {
    gutenbergId: 34970,
    title: "Pierre; or, The Ambiguities",
    author: "Herman Melville",
    year: 1852,
    description:
      "A young man leaves his comfortable life for a wild ideal — and the world swallows him whole. Melville's dark, sprawling novel of a soul that cannot be contained.",
  },
  {
    gutenbergId: 76513,
    title: "Billy Budd",
    author: "Herman Melville",
    year: 1924,
    description:
      "A handsome sailor, a vicious officer, and a murder that the law cannot judge. Melville's late, tragic tale of innocence and evil, set on a ship at the edge of the law.",
  },
  {
    gutenbergId: 11231,
    title: "Bartleby, the Scrivener",
    author: "Herman Melville",
    year: 1853,
    description:
      "A copyist in a Wall Street office slowly stops working — 'I would prefer not to.' Melville's perfect, eerie short story of a man who becomes a ghost in his own life.",
  },

  // ── Thomas De Quincey ──────────────────────────────────────────────────
  {
    gutenbergId: 2040,
    title: "Confessions of an English Opium-Eater",
    author: "Thomas De Quincey",
    year: 1856,
    description:
      "A man's descent into opium, and the terrible, beautiful dreams that follow. The founding text of the literary drug — and a Gothic of the mind, where the nightmare is the country house.",
  },
  {
    gutenbergId: 6148,
    title: "Narrative and Miscellaneous Papers",
    author: "Thomas De Quincey",
    year: 1821,
    description:
      "The murder of Elizabeth Canning, the dream of the anatomical school, and the opium dream — De Quincey's early papers, where the true and the uncanny are the same thing.",
  },

  // ── Charles Dickens ────────────────────────────────────────────────────
  {
    gutenbergId: 46,
    title: "A Christmas Carol",
    author: "Charles Dickens",
    year: 1843,
    description:
      "A miser is visited by three ghosts on Christmas Eve, and shown the life he has made and the death he will meet. The most famous ghost story of the season — and the most redemptive.",
  },
  {
    gutenbergId: 644,
    title: "The Haunted Man and the Ghost's Bargain",
    author: "Charles Dickens",
    year: 1848,
    description:
      "A man sells his past to a ghost, and is haunted by the memories he tried to bury. Dickens' dark Christmas tale, where the bargain is a curse and the haunting is the self.",
  },
  {
    gutenbergId: 1289,
    title: "Three Ghost Stories",
    author: "Charles Dickens",
    year: 1909,
    description:
      "The blind man's eye, the signal-manned room, and the devil's footman — three of Dickens' most chilling tales, published after his death, where the ghost is always the mind.",
  },
  {
    gutenbergId: 564,
    title: "The Mystery of Edwin Drood",
    author: "Charles Dickens",
    year: 1870,
    description:
      "A young man is found dead in the ruins of a cathedral, and a town of secrets closes around the crime. Dickens' unfinished masterpiece — a Gothic mystery that was never solved.",
  },
  {
    gutenbergId: 700,
    title: "The Old Curiosity Shop",
    author: "Charles Dickens",
    year: 1841,
    description:
      "An old man and his niece flee a cruel guardian through a England of fog and ruin, to a shop full of forgotten things. Dickens' most Gothic novel, where the curiosity shop is a mausoleum.",
  },
  {
    gutenbergId: 1400,
    title: "Great Expectations",
    author: "Charles Dickens",
    year: 1861,
    description:
      "A boy from the marshes is raised by a mysterious benefactor, and learns the cost of ambition. Dickens' most perfect novel — a Gothic of the self, where the forge is a prison.",
  },
  {
    gutenbergId: 98,
    title: "A Tale of Two Cities",
    author: "Charles Dickens",
    year: 1859,
    description:
      "It was the best of times, it was the worst of times — and a man sacrifices himself in the shadow of the guillotine. Dickens' epic of the French Revolution, where the mob is a ghost.",
  },
  {
    gutenbergId: 1023,
    title: "Bleak House",
    author: "Charles Dickens",
    year: 1853,
    description:
      "A fog that will not lift, a lawsuit that will not end, and an orphan who stumbles into a secret. Dickens' great novel of a society that is a haunted house.",
  },

  // ── William Makepeace Thackeray ────────────────────────────────────────
  {
    gutenbergId: 599,
    title: "Vanity Fair",
    author: "William Makepeace Thackeray",
    year: 1848,
    description:
      "Two women, a fortune, and a world that is a fairground of desire and ruin. Thackeray's savage, comic novel of a society that is a ghost story told in the first person.",
  },
  {
    gutenbergId: 2511,
    title: "The History of Henry Esmond",
    author: "William Makepeace Thackeray",
    year: 1852,
    description:
      "An Irish exile in a court of intrigue, love, and betrayal. Thackeray's most romantic novel, where the past is a battlefield and the heart a siege.",
  },

  // ── M. R. James, Blackwood & Hodgson ──────────────────────────────────
  {
    gutenbergId: 8486,
    title: "Ghost Stories of an Antiquary",
    author: "M. R. James",
    year: 1904,
    description:
      "A cursed manuscript, a haunted cabinet, and a village that keeps its dead. The founding collection of the English ghost story, told by a scholar who believes — and is ruined by it.",
  },
  {
    gutenbergId: 9629,
    title: "More Ghost Stories",
    author: "M. R. James",
    year: 1916,
    description:
      "A music-box that plays itself, a window that should not be opened, and a tale told by a dying man. James' finest ghost stories, where the horror is in the detail.",
  },
  {
    gutenbergId: 20387,
    title: "A Thin Ghost and Others",
    author: "M. R. James",
    year: 1947,
    description:
      "A thin ghost, a long engagement, and a tale of a village that will not forget. James' posthumous collection, where the scholar's calm is the last thing to fail.",
  },
  {
    gutenbergId: 14471,
    title: "The Empty House",
    author: "Algernon Blackwood",
    year: 1905,
    description:
      "A house that is empty, and a presence that is not. Blackwood's masterwork of the supernatural, where the uncanny is a force, not a figure, and the house is alive.",
  },
  {
    gutenbergId: 45964,
    title: "Day and Night Stories",
    author: "Algernon Blackwood",
    year: 1922,
    description:
      "The golden game, the wheel, and the things that happen in the dark between sleeping and waking. Blackwood's most celebrated collection, where the boundary thins.",
  },
  {
    gutenbergId: 10832,
    title: "Carnacki, the Ghost Finder",
    author: "William Hope Hodgson",
    year: 1915,
    description:
      "A pale, brilliant man who finds ghosts for a living, and the houses that will not let him leave. Hodgson's series, where the ghost is a problem to be solved — and a door to something worse.",
  },

  // ── H. P. Lovecraft & Arthur Machen ────────────────────────────────────
  {
    gutenbergId: 68283,
    title: "The Call of Cthulhu",
    author: "H. P. Lovecraft",
    year: 1928,
    description:
      "A dead man's journal, a statue from the sea, and a god that dreams beneath the waves. The story that built the mythos — and taught the horror that the universe is indifferent.",
  },
  {
    gutenbergId: 70652,
    title: "At the Mountains of Madness",
    author: "H. P. Lovecraft",
    year: 1936,
    description:
      "An Antarctic expedition finds a city that should not exist, and a truth that should not be known. Lovecraft's greatest novel, where the ice keeps a secret older than the earth.",
  },
  {
    gutenbergId: 50133,
    title: "The Dunwich Horror",
    author: "H. P. Lovecraft",
    year: 1929,
    description:
      "Twins born in a cursed village, a book that must not be read, and a thing that grows in the dark. Lovecraft's most nightmarish tale, where the horror is in the blood.",
  },
  {
    gutenbergId: 31469,
    title: "The Shunned House",
    author: "H. P. Lovecraft",
    year: 1919,
    description:
      "A house in Arkham that no one will enter, and a family that is not what it seems. Lovecraft's earliest masterwork, where the house is a mouth and the town keeps its distance.",
  },
  {
    gutenbergId: 73181,
    title: "The Shadow over Innsmouth",
    author: "H. P. Lovecraft",
    year: 1931,
    description:
      "A decaying fishing town, a race that is not human, and a debt owed to the sea. Lovecraft's most atmospheric novel, where the fog is a veil and the town is a trap.",
  },
  {
    gutenbergId: 389,
    title: "The Great God Pan",
    author: "Arthur Machen",
    year: 1904,
    description:
      "A young man is drawn into a secret society, and shown a vision that unmakesthe world. Machen's most famous and most forbidden story, where the door, once opened, cannot be closed.",
  },
];

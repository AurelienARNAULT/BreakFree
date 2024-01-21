using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class CadenasClick : MonoBehaviour
{
    private List<string> bonOrdre = new List<string> { "Dice", "Heart", "Star", "Piece" }; // Le bon ordre � faire
    private List<string> clicsJoueur = new List<string>(); // La liste des strings du joueur
    public GameObject dice;
    public GameObject piece;

    void Start()
    {

    }

    void Update()
    {
        if (Input.GetMouseButtonDown(0) || (Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began))
        {
            Vector3 clickPosition = Vector3.zero;

            if (Input.GetMouseButtonDown(0))
            {
                clickPosition = Input.mousePosition;
            }
            else if (Input.touchCount > 0)
            {
                clickPosition = Input.GetTouch(0).position;
            }

            Ray ray = Camera.main.ScreenPointToRay(clickPosition);
            RaycastHit hit;

            if (Physics.Raycast(ray, out hit))
            {
                GameObject clickedObject = hit.collider.gameObject;

                // Ajouter l'objet cliqu� � la liste des clics du joueur
                if (clickedObject.name == "Dice" || clickedObject.name == "Heart" || clickedObject.name == "Star" || clickedObject.name == "Piece") clicsJoueur.Add(clickedObject.name);

                Debug.Log(clicsJoueur.Count);

                // V�rifier si la liste des clics du joueur est �gale au bon ordre
                if (CheckClicsOrder())
                {
                    // Si l'ordre des clics est correct, faire quelque chose (� remplacer par votre logique)
                    Debug.Log("Bonne s�quence !");
                    PlayerPrefs.SetInt("PadlockOpen", 2);
                    SoundManager.Instance.PlayRiddleFinished();
                    SceneManager.LoadScene(1);
                }

                // Vider la liste des clics du joueur si elle a plus de 4 valeurs
                if (clicsJoueur.Count >= 4)
                {
                    SoundManager.Instance.PlayWrongObject();
                    clicsJoueur.Clear();
                }
            }
        }
    }

    bool CheckClicsOrder()
    {
        // V�rifier si la liste des clics du joueur correspond au bon ordre
        if (clicsJoueur.Count != bonOrdre.Count)
        {
            // Si la longueur est diff�rente, l'ordre est incorrect
            return false;
        }

        for (int i = 0; i < bonOrdre.Count; i++)
        {
            if (bonOrdre[i] != clicsJoueur[i])
            {
                // Si l'�l�ment � la position i est diff�rent, l'ordre est incorrect
                return false;
            }
        }

        // Si toutes les conditions sont remplies, l'ordre est correct
        return true;
    }

    public void ShowDice()
    {
        this.dice.SetActive(true);
    }

    public void ShowPiece()
    {
        this.piece.SetActive(true);
    }
}

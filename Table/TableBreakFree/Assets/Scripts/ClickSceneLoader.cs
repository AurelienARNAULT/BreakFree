using UnityEngine;
using UnityEngine.SceneManagement;
using Lean.Touch;
using System.Collections.Generic; // Ajoutez cette ligne pour inclure l'espace de noms System.Collections.Generic

public class ClickSceneLoader : MonoBehaviour
{
    // Définir le nom de la scène que vous voulez charger
    public string sceneToLoad;

    void OnEnable()
    {
        // Abonnez-vous à l'événement de clic de Lean Touch
        Debug.Log("OnEnable");
        LeanTouch.OnFingerDown += OnFingerTap;
    }

    void OnDisable()
    {
        Debug.Log("OnDisable");
        // Désabonnez-vous de l'événement lorsque le script est désactivé ou détruit
        LeanTouch.OnFingerDown -= OnFingerTap;
    }

    void OnFingerTap(LeanFinger finger)
    {
        Debug.Log("OnFingerTap");
        // Effectuer un raycast sur l'interface graphique
        List<UnityEngine.EventSystems.RaycastResult> results = LeanTouch.RaycastGui(finger.ScreenPosition);

        // Vérifier si le raycast a touché quelque chose
        if (results != null && results.Count > 0)
        {
            // Chargez la nouvelle scène
            SceneManager.LoadScene(sceneToLoad);
        }
    }
}

using UnityEngine;
using Lean.Touch;

public class AddToPocket : MonoBehaviour
{
    private bool isTouching = false;
    private float touchDuration = 0f;

    public GameObject pocketIconPrefab;
    private GameObject pocketIconInstance;

    private IconClickHandler iconClickHandler;

    private void Start()
    {
        iconClickHandler = pocketIconInstance.GetComponent<IconClickHandler>();

        if (iconClickHandler == null)
        {
            Debug.LogError("IconClickHandler script not found on pocketIconInstance!");
        } else
        {
            iconClickHandler.message = this.gameObject.name + "SendToPocket";
        }
    }

    private void Update()
    {
        if (isTouching)
        {
            touchDuration += Time.deltaTime;

            // Mettre à jour la position de l'icône pendant le déplacement
            if (!(LeanTouch.Fingers[0].ScreenDelta.magnitude > 0f) && touchDuration >= 2f)
            {
                UpdatePocketIconPosition();
                ShowPocketIcon();
            }
            else if (!(LeanTouch.Fingers[0].ScreenDelta.magnitude > 0f))
            {
                UpdatePocketIconPosition();
            }
        }
    }

    private void OnEnable()
    {
        LeanTouch.OnFingerDown += OnFingerDown;
        LeanTouch.OnFingerUp += OnFingerUp;

        pocketIconInstance = Instantiate(pocketIconPrefab);
        pocketIconInstance.SetActive(false);
    }

    private void OnDisable()
    {
        LeanTouch.OnFingerDown -= OnFingerDown;
        LeanTouch.OnFingerUp -= OnFingerUp;

        if (pocketIconInstance != null)
        {
            Destroy(pocketIconInstance);
        }
    }

    private void OnFingerDown(LeanFinger finger)
    {
        RaycastHit hit;
        Ray ray = Camera.main.ScreenPointToRay(finger.ScreenPosition);

        if (Physics.Raycast(ray, out hit) && hit.collider.gameObject == gameObject)
        {
            isTouching = true;

            // Position de l'icône à côté de l'objet
            UpdatePocketIconPosition();
        }
        else
        {
            // Cacher l'icône si le doigt ne touche ni l'objet ni l'icône
            //HidePocketIcon();
        }
    }

    private void OnFingerUp(LeanFinger finger)
    {
        isTouching = false;
        touchDuration = 0f;
    }

    private void UpdatePocketIconPosition()
    {
        // Mettre à jour la position de l'icône à côté de l'objet

        // Obtenir la position de l'objet par rapport à la caméra
        Vector3 objectScreenPoint = Camera.main.WorldToScreenPoint(transform.position);

        // Déterminer si l'objet est à gauche ou à droite de l'écran
        bool isObjectOnLeft = objectScreenPoint.x < Screen.width / 2;

        // Calculer la position de l'icône en conséquence
        Vector3 offset = isObjectOnLeft ? -transform.right * 80f : transform.right * 80f;
        Vector3 iconPosition = transform.position + offset;

        pocketIconInstance.transform.position = iconPosition;
    }


    private void ShowPocketIcon()
    {
        if (pocketIconInstance != null)
        {
            pocketIconInstance.SetActive(true);
        }
    }

    private void HidePocketIcon()
    {
        if (pocketIconInstance != null)
        {
            pocketIconInstance.SetActive(false);
        }
    }

    public void HideObject()
    {
        this.gameObject.SetActive(false);
    }
}
